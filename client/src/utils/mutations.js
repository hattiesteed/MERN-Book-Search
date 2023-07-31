import { gql } from '@apollo/client';
export const LOGIN_USER =gql`
mutation login(
    $email:String!,
    $password: String!
){
    login(
        email: $email,
        password: $password
    ){
        token
        user {
            _id
            username
            email
        }
    }
}`;

export const ADD_USER = gql `
mutation addUser (
    $username: String!
    $email: String!,
    $password: String! 
){
    addUser(
        username: $username,
        email: $email,
        password: $password
    ){
        token 
        user {
            _id
            username
            email
            bookCount
            savedBooks {
                authors
                bookId
                image
                link
                title
                description
            }
        }
    }
}`;
export const SAVE_BOOK = gql`
mutation saveBook ($newBook: InputBook!){
    saveBook(newBook: $newBook){
        _id
        username
        email
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }
}`;

export const REMOVE_BOOK = gql `
mutation removeBook($bookId: String!){
    removeBook(bookId: $bookId){
        _id
        uername
        email
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }
}`;