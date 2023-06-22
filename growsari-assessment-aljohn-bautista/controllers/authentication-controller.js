const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const userType = require('../enums/user-types');
const CustomError = require('../helpers/custom-error');
const {
  NOT_FOUND_ERROR, VALIDATION_ERROR,
} = require('../enums/error-codes');

class AuthenticationController {
  constructor(services) {
    this.services = services;
  }

  async signUp(req, res) {
    const { 
      body:{
        email,
        firstname,
        middlename,
        lastname,
        password,
        mobile_number,
        address,
      }
       } = req;
    // Create new user

    const user = await this.services.auth.create({
      email,
      mobile_number,
      password
    });

    if(!user){
      return res.status(400).send({
        message: 'Something went wrong',
      });
    }

    const profile = await user.createContact({
      firstname,
      middlename,
      lastname,
      mobile_number,
      email,
      address
    })

    // Generate access_token and refresh_token
    const { accessToken, refreshToken } = await this.services.auth.generateTokens(
      user.id,
      { as: userType.USER },
    );

    return res.status(201).send({
      message: 'Signup successful!',
      results: {
        access_token: accessToken,
        refresh_token: refreshToken,
      },
    });
  }


  async signIn(req, res) {

    const user = await this.services.auth.signIn(req.body);

    // Generate access_token and refresh_token
    const { accessToken, refreshToken } = await this.services.auth.generateTokens(
      user.id,
      { as: userType.CUSTOMER },
    );

    return res.status(200).send({
      message: 'Login successful!',
      results: {
        access_token: accessToken,
        refresh_token: refreshToken,
      },
    });
  }

  
  async refreshToken(req, res) {
    const { token: accessToken, body: { refresh_token: refreshToken } } = req;

    // Generate access_token
    const newAccessToken = await this.services.auth.refreshAccessToken({
      accessToken,
      refreshToken,
    });

    res.status(200).send({
      message: 'Refresh token successful!',
      results: {
        access_token: newAccessToken,
      },
    });
  }

  async changePassword(req, res) {
    const { body, user: { id: userId } } = req;

    await this.services.auth.changePassword({ userId, ...body });

    res.status(200).send({
      message: 'Password updated successfully!',
    });
  }

 

  // eslint-disable-next-line class-methods-use-this
  async verifyToken(req, res) {
    const { body: { token } } = req;

    // verifies secret and checks exp
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err || decoded.type !== 'access_token') {
        throw new CustomError(400, 'Token is invalid', VALIDATION_ERROR);
      }
    });

    res.status(200).send({
      message: 'Token is valid.',
    });
  }

  async updateProfile(req, res) {
    const { 
      user:{id:userId}, 
      body } = req;

    const updateProfile = await this.services.auth.update({
      userId,
      data: { ...body },
    });

    res.status(200).send({
      message: 'updated successfully!',
      results: updateProfile,
    });
  }
  
}

module.exports = AuthenticationController;
