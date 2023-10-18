import Appointment from "../entities/Appointment";
import { AppointmentsRepository } from "../repositories/appointments-repository";

interface CreateAppointmentRequest {
  customer: String;
  startsAt: Date;
  endsAt: Date;
}

type CreateAppointmentResponse = Appointment;

export class CreateAppointment {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async execute({
    customer,
    startsAt,
    endsAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overLappingAppointment =
      await this.appointmentsRepository.findOverLappingAppointment(
        startsAt,
        endsAt
      );
      if(overLappingAppointment){
        throw new Error("This appointment overlapps another one.")
      }

    const appointment = new Appointment({ customer, startsAt, endsAt });
    await this.appointmentsRepository.create(appointment);

    return appointment;
  }
}
