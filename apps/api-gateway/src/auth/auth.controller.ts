import { Controller, Post, Body, Res, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { signUp, signIn } from 'supertokens-node/recipe/emailpassword';
import { createNewSession } from 'supertokens-node/recipe/session';
import supertokens from 'supertokens-node';

class FormField {
  id: string;
  value: string;
}

class SignUpDto {
  formFields: FormField[];
}

class SignInDto {
  formFields: FormField[];
}

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  @Post('signup')
  @ApiOperation({
    summary: 'Sign up a new user',
    description: 'Creates a new user account with email and password',
  })
  @ApiBody({
    type: SignUpDto,
    description: 'User signup credentials',
  })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({
    status: 400,
    description: 'Email already exists or invalid input',
  })
  async signUp(
    @Body() body: SignUpDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      // Extract email and password from formFields
      //
      console.log('BODY', body);
      const emailField = body.formFields.find((field) => field.id === 'email');
      const passwordField = body.formFields.find(
        (field) => field.id === 'password',
      );

      if (!emailField || !passwordField) {
        return res.status(400).json({
          status: 'ERROR',
          message: 'Email and password are required',
        });
      }

      const response = await signUp(
        'public',
        emailField.value,
        passwordField.value,
      );

      if (response.status === 'OK') {
        // Create session for the new user
        await createNewSession(
          req,
          res,
          'public',
          supertokens.convertToRecipeUserId(response.user.id),
        );

        return res.status(201).json({
          status: 'OK',
          user: {
            id: response.user.id,
            email: response.user.emails[0],
          },
        });
      } else {
        return res.status(400).json({
          status: 'ERROR',
          message: 'Email already exists',
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 'ERROR',
        message: 'Internal server error',
      });
    }
  }

  @Post('signin')
  @ApiOperation({
    summary: 'Sign in an existing user',
    description: 'Authenticates user with email and password',
  })
  @ApiBody({
    type: SignInDto,
    description: 'User signin credentials',
  })
  @ApiResponse({ status: 200, description: 'User signed in successfully' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async signIn(
    @Body() body: SignInDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      // Extract email and password from formFields
      const emailField = body.formFields.find((field) => field.id === 'email');
      const passwordField = body.formFields.find(
        (field) => field.id === 'password',
      );

      if (!emailField || !passwordField) {
        return res.status(400).json({
          status: 'ERROR',
          message: 'Email and password are required',
        });
      }

      const response = await signIn(
        'public',
        emailField.value,
        passwordField.value,
      );

      if (response.status === 'OK') {
        // Create session for the authenticated user
        await createNewSession(
          req,
          res,
          'public',
          supertokens.convertToRecipeUserId(response.user.id),
        );

        return res.status(200).json({
          status: 'OK',
          user: {
            id: response.user.id,
            email: response.user.emails[0],
          },
        });
      } else {
        return res.status(401).json({
          status: 'ERROR',
          message: 'Invalid email or password',
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 'ERROR',
        message: 'Internal server error',
      });
    }
  }
}

