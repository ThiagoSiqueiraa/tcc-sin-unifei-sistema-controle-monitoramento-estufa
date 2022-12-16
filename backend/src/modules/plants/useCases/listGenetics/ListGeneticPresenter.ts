import { inject, injectable } from "tsyringe";

import { IGeneticsPresenter } from "./presenters/IGeneticsPresenter";

@injectable()
class ListGeneticPresenter {
  constructor(
    @inject("GeneticsPresenter")
    private geneticPresenter: IGeneticsPresenter
  ) {}

  format(genetics) {
    return this.geneticPresenter.format(genetics);
  }
}

export { ListGeneticPresenter };
