import { expect, test } from "vitest";
import Appointment from "./Appointment";

test("create an appointment", () => {
  const startsAt = new Date();
  const endsAt = new Date();
  startsAt.setDate(startsAt.getDate() + 1);
  endsAt.setDate(endsAt.getDate() + 2);

  const appointment = new Appointment({
    customer: "John Doe",
    startsAt: startsAt,
    endsAt: endsAt,
  });

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toEqual("John Doe");
});

test("can not create an appointment with end date earlier or equal to start date", () => {
  const startsAt = new Date();
  const endsAt = new Date();

  endsAt.setDate(endsAt.getDate() - 1);

  expect(() => {
    return new Appointment({
      customer: "John Doe",
      startsAt: startsAt,
      endsAt: endsAt,
    });
  }).Throw;
});

test("can not create an appointment with start date earlier or equal to current date", () => {
  const startsAt = new Date();
  const endsAt = new Date();

  startsAt.setDate(startsAt.getDate()-1);
  endsAt.setDate(endsAt.getDate() + 1);

  expect(() => {
    return new Appointment({
      customer: "John Doe",
      startsAt: startsAt,
      endsAt: endsAt,
    });
  }).Throw;
});