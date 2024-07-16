import { inject, injectable } from "tsyringe";

import { IAddressRepository } from "@modules/address/infra/repositories/IAddressRepository";
import { AddressModel } from "@modules/address/model/address";
import { AdaptarAddress } from "@modules/address/adaptar/address";


@injectable()
export class CreateMultiUseCase {
  constructor(
    @inject("IAddressRepository") private _address_repository: IAddressRepository
  ) { }
  async execute(form: AddressModel[], relation: Object, key: "user" | "organization" ): Promise<AddressModel[]> {
    const address = form.map(item => (
      {
        [key]: relation,
        ...item
      }
    ))
    return AdaptarAddress.addressMultiReturn(await this._address_repository.createMulti(address))
  }
}
