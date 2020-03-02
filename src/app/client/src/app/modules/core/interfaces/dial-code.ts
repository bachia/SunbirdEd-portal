export interface IDialParams {
    id?: any;
    ts?: number;
    /**
     * Additional params - userId, lastUpdatedOn, sort etc
     */
    params?: IParams;
    /**
     * Requesr body
     */
    request: IRequest;
}


export interface IParams {
    msgid?: string;
    resmsgid?: string;
    status?: string;
}

export interface IRequest {
    dialcodes: IDialCode;
}

export interface IDialCode {
    /**
      * Number of qr code to be generated
      */
    count: number;
    /**
     * Publisher name
     */
    publisher?: string;
}

export interface IContentLinkParams {
    id?: any;
    ts?: number;
    /**
     * Additional params - userId, lastUpdatedOn, sort etc
     */
    params?: IParams;
    /**
     * Requesr body
     */
    request: IContentLinkRequest;
}

export interface IContentLinkRequest {
    content : IContentReq;
}

export interface IContentReq {
    /**
      * contentIds
      */
    identifier: Array<string>;
    /**
     * description
     */
    description?: string;
    /**
     * dialcode to be linked to content
     */
    dialcode: Array<string>;
}

export interface IPublisherParams {
    id?: any;
    ts?: number;
    /**
     * Additional params - userId, lastUpdatedOn, sort etc
     */
    params?: IParams;
    /**
     * Requesr body
     */
    request: IPublisherRequest;
}

export interface IPublisherRequest {
    publisher: IPublisher
}

export interface IPublisher {
    /**
      * Number of qr code to be generated
      */
    identifier: string;
    /**
     * Publisher name
     */
    name: string;
}


