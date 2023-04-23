export type TimeStamp = string;
export type Value = boolean;
export enum Name {
    newVisitor = 'newVisitor',
    fullScrollDown = 'fullScrollDown',
    buttonHover = 'buttonHover',
    buttonClick = 'buttonClick',
    formInteraction = 'formInteraction',
    applicationSubmitted = 'applicationSubmitted',
    test = 'test'
};

export interface MetricEntry {
    timeStamp: TimeStamp
    name: Name
    value: Value
};