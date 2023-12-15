import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
import EventCard from "../../components/EventCard/index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.queryByText("Message envoyé !");
    });
  });
});

describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    render(<Home />);
    const EventList = screen.getByTestId("EventList");
    expect(EventList).toBeInTheDocument();
  });
  it("a list a people is displayed", () => {
    render(<Home />);
    const people = screen.getByTestId("People");
    expect(people).toBeInTheDocument();
    expect(screen.getByText("Animateur"));
  });
  it("a footer is displayed", () => {
    render(<Home />);
    const footer = screen.getByText("Contactez-nous");
    expect(footer).toBeInTheDocument();
  });
  it("an event card, with the last event, is displayed", () => {
    render(
      <>
        <Home />
        <EventCard />
      </>
    );
    const lastCard = screen.getByTestId("LastCard");
    const lastImg = screen.getAllByTestId("LastImg");
    expect(lastCard).toBeInTheDocument();
    expect(lastCard.getAttribute("class").includes("Eventcard--small"));
    expect(lastImg).not.toBeNaN();
    expect(lastImg).toBeDefined();
  });
});
