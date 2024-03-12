import { Router } from 'express';
import { StatusCodes } from 'http-status-codes'
import UserService from '../../service/User';

const router = Router({ mergeParams: true });

router.get('/', async (_req, res) => {
  try {
    const result = await UserService.list();

    return res.status(StatusCodes.OK).json(result);
  } catch (err: any) {
    console.error(err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || 'Internal server error'
    });
  };
});

router.get('/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const result = await UserService.findByQuery(query);

    return res.status(StatusCodes.OK).json(result);
  } catch (err: any) {
    console.error(err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || 'Internal server error'
    });
  };
});

router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await UserService.create({ name, email, password });

    return res.status(StatusCodes.CREATED).json(result);
  } catch (err: any) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || 'Internal server error'
    });
  };
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await UserService.login({ email, password });

    return res.status(StatusCodes.OK).json(result);
  } catch (err: any) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || 'Internal server error'
    });
  };
});

const user = (root: Router) => {
  root.use('/user', router)
};

export { user };
