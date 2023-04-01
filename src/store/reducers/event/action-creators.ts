import { AppDispatch } from "../..";
import { IEvent } from "../../../models/IEvent";
import { IUser } from "../../../models/IUser";
import { EventActionEnum, setEventsAction, setGuestsAction } from "./types";
import { UserService } from "../../../api/services/UserService";

export const EventActionCreators = {
  setGuests: (payload: IUser[]): setGuestsAction => ({
    type: EventActionEnum.SET_GUESTS,
    payload
  }),
  setEvents: (payload: IEvent[]): setEventsAction => ({
    type: EventActionEnum.SET_EVENTS,
    payload
  }),
  fetchGuests: () => async (dispatch: AppDispatch) => {
    try {
      const { users } = await UserService.getUsers();
      
      dispatch(EventActionCreators.setGuests(users));
    } catch (err: any) {
      console.timeLog(err.message)
    }
  },
  createEvent: (eventData: IEvent) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem("events") || '[]';
      const json = JSON.parse(events) as IEvent[];
      json.push(eventData);
      dispatch(EventActionCreators.setEvents(json));
      localStorage.setItem("events", JSON.stringify(json));
    } catch(err: any) {
      console.log(err.message)
    }
  },
  fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem("events") || '[]';
      const json = JSON.parse(events) as IEvent[];
      const currentUserEvents = json.filter(event => event.author === username || event.guest === username);
      dispatch(EventActionCreators.setEvents(currentUserEvents));
    } catch(err: any) {
      console.log(err.message)
    }
  }
}