import { IsNotEmpty, IsNotEmptyObject, Length, validate } from "class-validator";
import { CityModelView } from "./city";
import { AppError } from "@shared/infra/errors/AppError";
import { UserModalView } from "@modules/user/modelView/user";
import { OrganizationModelView } from "@modules/organization/modelView/organization";

export class AddressModelView {
  id?: number

  @IsNotEmptyObject()
  city: CityModelView;

  user?: UserModalView
  
  organization?: OrganizationModelView

  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  postal_code: string;

  @IsNotEmpty()
  district: string;

  @Length(0, 1000,)
  complement: string;

  created_at?: Date

  updated_at?: Date

  static validade(data: Partial<AddressModelView>) {
    const instance = new AddressModelView();
    Object.assign(instance, data)
    validate(this).then((errors) => {
      if (errors.length > 0)
        throw new AppError(errors.map((error) => Object.values(error.constraints)).join(", ").toString(), 401);
    });
    return data
  }

}
