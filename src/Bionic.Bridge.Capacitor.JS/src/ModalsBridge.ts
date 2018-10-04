import {
  ActionSheetOptions,
  ActionSheetResult,
  AlertOptions,
  ConfirmOptions,
  ConfirmResult,
  Plugins,
  PromptOptions,
  PromptResult
} from '@capacitor/core';

const {Modals} = Plugins;

interface IModals {
  alert(options: AlertOptions): Promise<void>;

  confirm(options: ConfirmOptions): Promise<ConfirmResult>;

  prompt(options: PromptOptions): Promise<PromptResult>;

  showActions(options: ActionSheetOptions): Promise<ActionSheetResult>;
}

export class ModalsBridge implements IModals {

  public async alert(options: AlertOptions): Promise<void> {
    if (!Modals) return Promise.reject("Modals not available.");
    try {
      return await Modals.alert(options);
    } catch (e) {
      return new Promise<void>((r, reject) => reject(e.message));
    }
  }

  public async confirm(options: ConfirmOptions): Promise<ConfirmResult> {
    if (!Modals) return Promise.reject("Modals not available.");
    try {
      return await Modals.confirm(options);
    } catch (e) {
      return new Promise<ConfirmResult>((r, reject) => reject(e.message));
    }
  }

  public async prompt(options: PromptOptions): Promise<PromptResult> {
    if (!Modals) return Promise.reject("Modals not available.");
    try {
      return await Modals.prompt(options);
    } catch (e) {
      return new Promise<PromptResult>((r, reject) => reject(e.message));
    }
  }

  public async showActions(options: ActionSheetOptions): Promise<ActionSheetResult> {
    if (!Modals) return Promise.reject("Modals not available.");
    try {
      return await Modals.showActions(options);
    } catch (e) {
      return new Promise<ActionSheetResult>((r, reject) => reject(e.message));
    }
  }
}
