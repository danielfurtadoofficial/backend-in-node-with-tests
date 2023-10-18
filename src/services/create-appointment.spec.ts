import { describe, expect, it } from "vitest";
import { CreateAppointment } from "./create-appointment";
import Appointment from "../entities/Appointment";
import { getFutureDate } from "../tests/utils/get-future-date";
import { InMemoryAppointments } from "../repositories/in-memory-repositories/in-memory-appointments";

describe("Create Appointment", () => {
  it("should be able to create an appointment", () => {
    const startsAt = getFutureDate("2020-10-11");
    const endsAt = getFutureDate("2020-10-12");

    const appointmentsRepository = new InMemoryAppointments();
    const createAppointment = new CreateAppointment(appointmentsRepository);

    expect(
      createAppointment.execute({
        customer: "Jhon Doe",
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });

  it("should not be able to create an appointment with overlapping dates", async () => {
    const startsAt = getFutureDate("2020-10-10");
    const endsAt = getFutureDate("2020-10-15");

    const appointmentsRepository = new InMemoryAppointments();
    const createAppointment = new CreateAppointment(appointmentsRepository);

    await createAppointment.execute({
      customer: "Jhon Doe",
      startsAt,
      endsAt,
    })

    expect(
      createAppointment.execute({
        customer: "Michael Jordan",
        startsAt: getFutureDate("2020-10-14"),
        endsAt: getFutureDate("2020-10-19"),
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
