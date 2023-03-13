import userResolvers from './user';
import adviceResolvers from './advice';
import _ from 'lodash';


export default _.merge(adviceResolvers, userResolvers);