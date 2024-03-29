export class Alert {
    id!: string;
    type!: AlertType;
    message!: string;
    autoClose = false;
    keepAfterRouteChange? = false;
    fade = false;

    constructor(init?:Partial<Alert>) {
        Object.assign(this, init);
    }
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}

export class AlertOptions {
    id?: string;
    autoClose?: boolean;
    keepAfterRouteChange?: boolean;
}
