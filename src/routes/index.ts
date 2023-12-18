import helloRoute from './hello.route';

import { generateAppRoutes } from 'utils';
export default generateAppRoutes([['/hello', helloRoute]]);
