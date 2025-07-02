import { makeAutoObservable } from "mobx";

export class AccordionStatusPokemon {
  idCard: number | null = null;

  constructor() {
    makeAutoObservable(this);
    this.openAccordion = this.openAccordion.bind(this);
  }

  openAccordion(idCard: number | null) {
    this.idCard = this.idCard === idCard ? null : idCard;
  }
}

export const accordionStatusPokemon = new AccordionStatusPokemon();
