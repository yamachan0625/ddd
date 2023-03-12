import express, { Request, Response } from 'express';
import { DomainEventPublisher } from '../Infrastructure/event/DomainEventPublisher';
import InMemoryUserRepository, {
  createInMemoryUserRepository,
} from '../Infrastructure/Inmemory/InMemoryUserRepository';
import { CreateUserService } from '../XXXApplication/user/CreateUserService/CreateUserService';
import { CreateUserCommand } from '../XXXApplication/user/CreateUserService/CreateUserServiceCommand';
import { GetUserService } from '../XXXApplication/user/GetUserService/GetUserService';
import { UserID } from '../XXXDomain/models/user/UserID/UserID';
import { CheckDuplicateUserService } from '../XXXDomain/services/user/CheckDuplicateUserService';

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.listen(3001, () => {
  console.log(`Express server listening`);
});

const userRepository = createInMemoryUserRepository.instance;

app.get(
  '/users',
  async (
    req: Request<never, never, never, { userId: string }>,
    res: Response
  ) => {
    const { userId } = req.query;

    const getUserService = new GetUserService(userRepository);
    const userData = await getUserService.execute(UserID.create(userId));

    userData
      ? res.status(200).send(userData)
      : res.status(404).send('Sorry, cant find that');
  }
);

app.post(
  '/users',
  async (
    req: Request<never, never, { userName: string; email: string }>,
    res: Response
  ) => {
    const { userName, email } = req.body;
    const command = new CreateUserCommand(userName, email);

    const checkDuplicateUserService = new CheckDuplicateUserService(
      userRepository
    );
    const domainEventPublisher = new DomainEventPublisher();
    const createUserService = new CreateUserService(
      userRepository,
      checkDuplicateUserService,
      domainEventPublisher
    );

    await createUserService.execute(command);

    res.sendStatus(200);
  }
);
