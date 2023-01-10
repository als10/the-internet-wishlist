import { gql } from '@apollo/client';

export const ALL_PROJECTS_QUERY = gql`
  query Projects {
    projects {
      _id
      title
      description
      tags
      backgroundColor
      starredBy
      createdAt
      updatedAt
    }
  }
`;

export const MY_PROJECTS_QUERY = gql`
  query MyProjects {
    myProjects {
      _id
      title
      description
      tags
      backgroundColor
      starredBy
      createdAt
      updatedAt
    }
  }
`;

export const STARRED_PROJECTS_QUERY = gql`
  query MyStarredProjects {
    myStarredProjects {
      _id
      title
      description
      tags
      backgroundColor
      starredBy
      createdAt
      updatedAt
    }
  }
`;

export const PROJECT_QUERY = gql`
  query Project($input: GetProjectByIdInput!) {
    project(input: $input) {
      _id
      title
      description
      tags
      backgroundColor
      starredBy
      createdAt
      updatedAt
      creator {
        _id
        username
        avatar
        email
      }
      submissions {
        _id
        creator {
          _id
          username
          avatar
          email
        }
        link
        createdAt
        updatedAt
      }
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      _id
      username
      email
      avatar
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      _id
      username
      email
      avatar
    }
  }
`;

export const CREATE_PROJECT_MUTATION = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      _id
      title
      description
      tags
      backgroundColor
      starredBy
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_PROJECT_MUTATION = gql`
  mutation UpdateProject($input: UpdateProjectInput!) {
    updateProject(input: $input) {
      _id
      title
      description
      tags
      backgroundColor
      starredBy
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_PROJECT_MUTATION = gql`
  mutation DeleteProject($input: DeleteProjectInput!) {
    deleteProject(input: $input)
  }
`;

export const STAR_PROJECT_MUTATION = gql`
  mutation StarProject($input: StarProjectInput!) {
    starProject(input: $input)
  }
`;

export const UNSTAR_PROJECT_MUTATION = gql`
  mutation UnstarProject($input: StarProjectInput!) {
    unstarProject(input: $input)
  }
`;

export const ADD_SUBMISSION_MUTATION = gql`
  mutation AddSubmissionToProject($input: AddSubmissionInput!) {
    addSubmissionToProject(input: $input) {
      _id
      creator {
        _id
        username
        avatar
        email
      }
      link
      createdAt
      updatedAt
    }
  }
`;

export const REMOVE_SUBMISSION_MUTATION = gql`
  mutation RemoveSubmissionFromProject($input: RemoveSubmissionInput!) {
    removeSubmissionFromProject(input: $input) {
      _id
      creator {
        _id
        username
        avatar
        email
      }
      link
      createdAt
      updatedAt
    }
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      _id
      username
      email
      avatar
    }
  }
`;

export const REFRESH_TOKEN_QUERY = gql`
  query RefreshToken {
    refreshAccessToken
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      _id
      username
      email
      avatar
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;
