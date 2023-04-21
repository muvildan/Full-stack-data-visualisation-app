export type TimeStamp = string;
export enum Name {
    newVisitor = 'newVisitor',
    fullScrollDown = 'fullScrollDown',
    buttonHover = 'buttonHover',
    buttonClick = 'buttonClick',
    formInteraction = 'formInteraction',
    applicationSubmitted = 'applicationSubmitted'
};
export type Value = boolean;

export interface MetricEntry {
    timeStamp: TimeStamp
    name: Name
    value: Value
};