import { Router } from 'express';
import { StatusCodes } from 'http-status-codes'
import ClientService from '../../service/Client';

const router = Router({ mergeParams: true });

router.get('/', async (_req, res) => {
  try {
    const result = await ClientService.list();

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
    const result = await ClientService.findByQuery(query);

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
    const { name, phone, email, coordinate } = req.body;
    const result = await ClientService.create({ name, phone, email, coordinate });

    return res.status(StatusCodes.CREATED).json(result);
  } catch (err: any) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || 'Internal server error'
    });
  };
});

const client = (root: Router) => {
  root.use('/client', router)
};

export { client };
