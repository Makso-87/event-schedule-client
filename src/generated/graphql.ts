import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
    DateTimeISO: { input: any; output: any };
};

export type CreateEventCategoryInput = {
    color: Scalars['String']['input'];
    description: Scalars['String']['input'];
    name: Scalars['String']['input'];
};

export type CreateEventInput = {
    categoryId: Scalars['String']['input'];
    endDate?: InputMaybe<Scalars['DateTimeISO']['input']>;
    endTime?: InputMaybe<Scalars['String']['input']>;
    lent?: InputMaybe<Scalars['String']['input']>;
    name: Scalars['String']['input'];
    place: Scalars['String']['input'];
    startDate: Scalars['DateTimeISO']['input'];
    startTime?: InputMaybe<Scalars['String']['input']>;
    url?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserInput = {
    email?: InputMaybe<Scalars['String']['input']>;
    firstName: Scalars['String']['input'];
    lastName: Scalars['String']['input'];
    middleName: Scalars['String']['input'];
    password: Scalars['String']['input'];
    phone?: InputMaybe<Scalars['String']['input']>;
};

export type DeleteEventCategoryInput = {
    ids: Array<Scalars['String']['input']>;
};

export type DeleteEventsInput = {
    ids: Array<Scalars['String']['input']>;
};

export type Event = {
    __typename?: 'Event';
    category: EventCategory;
    categoryId: Scalars['String']['output'];
    createdAt: Scalars['DateTimeISO']['output'];
    deletedAt: Scalars['DateTimeISO']['output'];
    endDate?: Maybe<Scalars['DateTimeISO']['output']>;
    endTime?: Maybe<Scalars['String']['output']>;
    id: Scalars['String']['output'];
    lent?: Maybe<Scalars['String']['output']>;
    name: Scalars['String']['output'];
    place: Scalars['String']['output'];
    startDate: Scalars['DateTimeISO']['output'];
    startTime?: Maybe<Scalars['String']['output']>;
    updatedAt: Scalars['DateTimeISO']['output'];
    url?: Maybe<Scalars['String']['output']>;
};

export type EventCategory = {
    __typename?: 'EventCategory';
    color: Scalars['String']['output'];
    createdAt: Scalars['DateTimeISO']['output'];
    deletedAt: Scalars['DateTimeISO']['output'];
    description: Scalars['String']['output'];
    events?: Maybe<Array<Event>>;
    id: Scalars['String']['output'];
    name: Scalars['String']['output'];
    updatedAt: Scalars['DateTimeISO']['output'];
};

export type LoginInput = {
    email?: InputMaybe<Scalars['String']['input']>;
    password: Scalars['String']['input'];
    phone?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
    __typename?: 'Mutation';
    createCategory: EventCategory;
    createEvent: Event;
    createUser: User;
    deleteCategories: Array<Scalars['String']['output']>;
    deleteEvents: Array<Scalars['String']['output']>;
    deleteUsers: Array<Scalars['String']['output']>;
    login: Scalars['String']['output'];
    updateCategory: EventCategory;
    updateEvent: Event;
};

export type MutationCreateCategoryArgs = {
    input: CreateEventCategoryInput;
};

export type MutationCreateEventArgs = {
    input: CreateEventInput;
};

export type MutationCreateUserArgs = {
    input: CreateUserInput;
};

export type MutationDeleteCategoriesArgs = {
    input: DeleteEventCategoryInput;
};

export type MutationDeleteEventsArgs = {
    input: DeleteEventsInput;
};

export type MutationDeleteUsersArgs = {
    input: UsersDeleteInput;
};

export type MutationLoginArgs = {
    input: LoginInput;
};

export type MutationUpdateCategoryArgs = {
    input: UpdateEventCategoryInput;
};

export type MutationUpdateEventArgs = {
    input: UpdateEventInput;
};

export type Query = {
    __typename?: 'Query';
    categories: Array<EventCategory>;
    events: Array<Event>;
    me: User;
    users: Array<User>;
};

export type UpdateEventCategoryInput = {
    color: Scalars['String']['input'];
    description: Scalars['String']['input'];
    id: Scalars['String']['input'];
    name: Scalars['String']['input'];
};

export type UpdateEventInput = {
    categoryId?: InputMaybe<Scalars['String']['input']>;
    endDate?: InputMaybe<Scalars['DateTimeISO']['input']>;
    endTime?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['String']['input'];
    lent?: InputMaybe<Scalars['String']['input']>;
    name?: InputMaybe<Scalars['String']['input']>;
    place?: InputMaybe<Scalars['String']['input']>;
    startDate?: InputMaybe<Scalars['DateTimeISO']['input']>;
    startTime?: InputMaybe<Scalars['String']['input']>;
    url?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
    __typename?: 'User';
    createdAt: Scalars['DateTimeISO']['output'];
    deletedAt: Scalars['DateTimeISO']['output'];
    email: Scalars['String']['output'];
    firstName: Scalars['String']['output'];
    id: Scalars['String']['output'];
    lastName: Scalars['String']['output'];
    middleName: Scalars['String']['output'];
    password: Scalars['String']['output'];
    phone: Scalars['String']['output'];
    updatedAt: Scalars['DateTimeISO']['output'];
};

export type UsersDeleteInput = {
    ids: Array<Scalars['String']['input']>;
};

export type CategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type CategoriesQuery = {
    __typename?: 'Query';
    categories: Array<{
        __typename?: 'EventCategory';
        id: string;
        name: string;
        color: string;
        description: string;
        events?: Array<{ __typename?: 'Event'; id: string; name: string }> | null;
    }>;
};

export type EventsQueryVariables = Exact<{ [key: string]: never }>;

export type EventsQuery = {
    __typename?: 'Query';
    events: Array<{
        __typename?: 'Event';
        id: string;
        name: string;
        startDate: any;
        endDate?: any | null;
        startTime?: string | null;
        endTime?: string | null;
        place: string;
        url?: string | null;
        lent?: string | null;
        category: { __typename?: 'EventCategory'; id: string; name: string; color: string; description: string };
    }>;
};

export const CategoriesDocument = gql`
    query Categories {
        categories {
            id
            name
            color
            description
            events {
                id
                name
            }
        }
    }
`;
// @ts-ignore
export type CategoriesQueryResult = Apollo.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
export const EventsDocument = gql`
    query Events {
        events {
            id
            name
            startDate
            endDate
            startTime
            endTime
            place
            url
            lent
            category {
                id
                name
                color
                description
            }
        }
    }
`;
// @ts-ignore
export type EventsQueryResult = Apollo.QueryResult<EventsQuery, EventsQueryVariables>;
