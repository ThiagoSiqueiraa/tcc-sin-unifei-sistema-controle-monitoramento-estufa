import { IGeneticsPresenter } from "../IGeneticsPresenter";

class GeneticsPresenter implements IGeneticsPresenter{
  format(genetics: any) {
    return genetics.map((genetic) => {
      return {
        id: genetic['_id']
      }
    })
  }

}

export {GeneticsPresenter}