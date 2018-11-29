import React, { Component } from "react";
import "./App.css";
import { Query, withApollo, Mutation } from "react-apollo";
import { USERS_QUERY, ADD_USER, DEL_USER, UPDATE_USER } from "./apollo/type";
import { fieldsValidation, prettyTime } from "./utils";

const GENDERS = {
  MALE: "男",
  FEMALE: "女"
};

class App extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  state = {
    name: "",
    age: "",
    gender: ""
  };

  onChange = key => event => {
    const target = event.target;

    let value = target.value;

    if (target.type === "number") {
      value = parseInt(value);
    }

    this.setState({
      [key]: value
    });
  };

  onDelUser = async (delHandler, id) => {
    const result = await delHandler({
      variables: {
        id
      }
    });
  };

  onAddUser = handler => async event => {
    event.preventDefault();
    const { name, age, gender } = this.state;
    if (fieldsValidation([name, age, gender])) {
      try {
        const result = await handler({
          variables: {
            name,
            age,
            gender
          }
        });
        if (result.errors) {
          throw new Error(result.errors);
        } else {
          this.setState({
            name: "",
            age: "",
            gender: ""
          });
        }
      } catch (errors) {
        console.log("errors", errors);
      }
    }
  };

  render() {
    const { name, age, gender } = this.state;

    return (
      <div className="App">
        <Mutation mutation={ADD_USER}>
          {addUser => {
            return (
              <div className={"user-form"}>
                <form onSubmit={this.onAddUser(addUser)}>
                  <input
                    placeholder="Name"
                    type="text"
                    name="user-name"
                    value={name}
                    onChange={this.onChange("name")}
                  />
                  <input
                    placeholder="Age"
                    type="number"
                    name="user-age"
                    value={age}
                    onChange={this.onChange("age")}
                  />
                  <div className="group">
                    <input
                      id="male"
                      type="radio"
                      name="gender"
                      value={GENDERS.MALE}
                      checked={gender === GENDERS.MALE}
                      onChange={this.onChange("gender")}
                    />
                    <label htmlFor="male">Male</label>
                    <input
                      id="female"
                      type="radio"
                      name="gender"
                      value={GENDERS.FEMALE}
                      checked={gender === GENDERS.FEMALE}
                      onChange={this.onChange("gender")}
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                  <input type="submit" value="Add User" />
                </form>
              </div>
            );
          }}
        </Mutation>

        <div className="user-list">
          <h2>Users</h2>
          <Query query={USERS_QUERY}>
            {({ data }) => {
              if (data.users.length <= 0) {
                return <div className={"no-users"}>No User found</div>;
              }
              return (
                <ol>
                  {data.users.map((user, index) => {
                    return (
                      <li
                        className={`${"user-item"} ${
                          user.active ? "active" : ""
                        }`}
                        key={index}
                      >
                        <div className={"avatar"} />
                        <div className={"bio"}>
                          <div className={"name"}>
                            {user.name} <span className={"id"}>{user.id}</span>
                          </div>
                          <div className={"profile"}>
                            {user.gender},{user.age}
                          </div>
                          <div className={"join"}>
                            <div>创建于: {prettyTime(user.createdAt)}</div>

                            <Mutation mutation={DEL_USER}>
                              {delUser => (
                                <div
                                  onClick={() =>
                                    this.onDelUser(delUser, user.id)
                                  }
                                >
                                  删除
                                </div>
                              )}
                            </Mutation>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              );
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default withApollo(App);
