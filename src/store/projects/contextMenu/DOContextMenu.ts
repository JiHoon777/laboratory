import { action, makeObservable, observable } from "mobx";

export class DOContextMenu {
  text: string;
  context: string;

  showToggleContextButton: boolean = false;
  showContext: boolean = false;

  constructor(text: string, context: string) {
    this.text = text;
    this.context = context;
    makeObservable(this, {
      showToggleContextButton: observable,
      showContext: observable,

      setShowToggleContextButton: action,
      setShowContext: action,
    });
  }

  setShowToggleContextButton(show: boolean) {
    this.showToggleContextButton = show;
  }

  setShowContext(show: boolean) {
    this.showContext = show;
  }
}
