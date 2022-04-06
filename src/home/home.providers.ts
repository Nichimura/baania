import { Home } from './entity/home.entity';
import { HOMES_REPOSITORY } from '../core/constants/';

export const homesProviders = [
  {
    provide: HOMES_REPOSITORY,
    useValue: Home,
  },
];
