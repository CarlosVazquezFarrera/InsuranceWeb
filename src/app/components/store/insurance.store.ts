import { inject } from "@angular/core";
import { PersonDTO } from "@models/DTOs/personDTO";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { PersonService } from "@services/person.service";

type InsuranceState = {
    people: Array<PersonDTO>,
    lasPersonAdded: PersonDTO,
    isLoading: boolean
}
const initialState: InsuranceState = {
    people: [],
    lasPersonAdded: {
        companyname: "",
        contactname: "",
        email: "",
        phone: ""
    },
    isLoading: false
}

export const InsuranceStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, personService = inject(PersonService)) => ({
        async addPerson(person: PersonDTO): Promise<void> {
            patchState(store, { isLoading: true })
            const newPerson = await personService.addPerson(person);
            patchState(store, () => ({
                lasPersonAdded: newPerson,
                isLoading: false
            }))
        },
        async getPeople(): Promise<void> {
            patchState(store, { isLoading: true })
            const people = await personService.getPeople();
            patchState(store, () => ({
                people,
                isLoading: false
            }))
        }
    }))
);

