export interface IUploadFileMessage {

  responseMessage?: string

}

export class UploadFileMessage implements IUploadFileMessage {
  constructor(public responseMessage?: string) {}
}
