import { helloController } from 'controllers';
import { route } from 'utils';

export default route([
  {
    handler: helloController.GetHello,
  },
]);
