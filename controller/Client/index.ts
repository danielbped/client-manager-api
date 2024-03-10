import { Router } from 'express';
import { StatusCodes } from 'http-status-codes'
import Client from '../../model/Client'

const router = Router({ mergeParams: true });

router.get('/', async (_req, res) => {
  try {
    const result = await Client.list();

    return res.status(StatusCodes.OK).json(result);
  } catch (err: any) {
    console.error(err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || 'Internal server error'
    })
  }
})

const client = (root: Router) => {
  root.use('/client', router)
}

export { client };
