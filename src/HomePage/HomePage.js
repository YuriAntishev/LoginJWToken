import React from 'react';

import { userService } from '../_services/user.service.js';
import { authenticationService } from '../_services/authentication.service.js';
import '../HomePage/table.css';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: authenticationService.currentUserValue,
      users: null
    };
  }

  componentDidMount() {
    userService.getAll().then(users => this.setState({ users }));
  }

  render() {
    const { currentUser, users } = this.state;
    return (
      <div className="col-md-12">
        <h1>Добро пожаловать {currentUser.firstName}!</h1>

        <h3>Товары текущего пользователя:</h3>
        {users &&
          <div>
            {users.map(user =>
              <div key={user.id}>

                {user.firstName} {user.lastName}

                <h2 className="title">Результаты расчёта</h2>
                <hr className="line"></hr>
                <table id="customers">
                  <tbody>
                    <tr>
                      <th></th>
                      <th className="designation">Наименование</th>
                      <th>Кол-во</th>
                      <th>Цена за ед, Р</th>
                      <th>Стоимость, Р</th>
                      <th></th>
                    </tr>
                    {user.AssociatedProducts.map(product =>
                      <tr key={product.id}>
                        <td>
                          <div className="circular--landscape">
                            <img src={product.imagePath} alt="image1" />
                          </div>
                        </td>
                        <td className="designation">
                          {product.name}
                        </td>
                        <td>
                          {product.quantity}
                        </td>
                        <td>
                          {product.PiecePrice}
                        </td>
                        <td>
                          {product.cost}
                        </td>
                        <td>
                          <div className="image-swap-container">
                            <div className="image-swap"></div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        }

      </div>
    );
  }
}

export { HomePage };