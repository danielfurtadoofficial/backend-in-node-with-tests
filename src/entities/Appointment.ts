export interface AppointmentProps {
  customer: String;
  startsAt: Date;
  endsAt: Date;
}

export default class Appointment {
  private props: AppointmentProps;

  get customer() {
    return this.props.customer;
  }

  get startsAt() {
    return this.props.startsAt;
  }

  get endsAt() {
    return this.props.endsAt;
  }

  constructor(props: AppointmentProps) {
    const { startsAt, endsAt } = props;

    if (startsAt <= new Date())
      throw new Error(
        "Invalid start date. Start date must be later than current date."
      );

    if (endsAt <= startsAt)
      throw new Error(
        "Invalid end date. End date must be later than start date."
      );

    this.props = props;
  }

}
