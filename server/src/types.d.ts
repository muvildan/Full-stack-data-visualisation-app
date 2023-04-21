export type TimeStamp = string;
export type Name = 'newVisitor' | 'fullScrollDown' | 'buttonHover' | 'buttonClick' | 'formInteraction' | 'applicationSubmitted';
export type Value = true;

export interface MetricEntry {
    timeStamp: TimeStamp;
    name: Name;
    value: Value;
}