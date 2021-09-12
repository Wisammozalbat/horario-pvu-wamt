import styled from 'styled-components';

export const InputsStyle = styled.div`
  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    label {
      margin-bottom: 1rem;
      font-size: 1.6rem;
    }

    input {
      border-radius: 0;
      border: 1px solid black;
      padding: 0.5rem 1rem;
      margin-bottom: 1rem;
    }

    button {
      border-radius: 0.5rem;
      padding: 1rem 2rem;
      background-color: lightblue;
      font-size: 1.6rem;
      margin-top: 1rem;
    }
  }

  .schedule {
    &-container {
      display: flex;
      gap: 4rem;
      justify-content: center;
      margin-top: 2rem;
      font-size: 2rem;
    }

    &-column {
      display: flex;
      flex-direction: column;
    }

    &-group {
      font-weight: bold;
    }
  }
`;
