import { AuthModel } from "./auth.model";

export class UserModel extends AuthModel {
  id?: string;
  companyName?: string;
  ownerName?: string;
  email?: string;
  mobile?: string;
  pos?: boolean;
  online?: boolean;
  mLogistic?: boolean;
  haveTax?: boolean;
  taxationNumber?: string;
  status?: number;
  country?: string;
  state?: string;
  city?: string;
  area?: string;
  zipcode?: string;
  address1?: string;
  address2?: string;
  image?: string;

  setUser(user: Partial<UserModel>) {
    this.id = user.id || '';
    this.companyName = user.companyName || '';
    this.ownerName = user.ownerName || '';
    this.email = user.email || '';
    this.mobile = user.mobile || '';
    this.pos = user.pos || false; // Change the default value to false
    this.online = user.online || false; // Change the default value to false
    this.mLogistic = user.mLogistic || false; // Change the default value to false
    this.haveTax = user.haveTax || false; // Change the default value to false
    this.taxationNumber = user.taxationNumber || '';
    this.status = user.status || 0; // Change the default value to 0
    this.country = user.country || '';
    this.state = user.state || '';
    this.city = user.city || '';
    this.area = user.area || '';
    this.zipcode = user.zipcode || '';
    this.address1 = user.address1 || '';
    this.address2 = user.address2 || '';
    this.image = user.image || './assets/media/avatars/blank.png';
  }
}
