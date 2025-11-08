# Auth0 SDK Gallery

Collection of sample codes for [Auth0 SDK libraries](https://auth0.com/docs/libraries).

* [next.js](./next.js/readme.md)
* [java](./java/readme.md)
* [hono](./hono/readme.md)

## Feature Matrix

### Server Side SDKs

#### Standard OAuth2 / OIDC Features

<table>
<thead>
    <tr>
        <th>
            SDK
        </th>
        <th>
            <a href="https://datatracker.ietf.org/doc/draft-ietf-oauth-v2-1/">OAuth 2.1</a>
        </th>
        <th>
            <a href="https://datatracker.ietf.org/doc/html/rfc7519">JWT</a>
        </th>
        <th>
            <a href="https://datatracker.ietf.org/doc/html/rfc7636">PKCE</a>
        </th>
        <th>
            <a href="https://datatracker.ietf.org/doc/html/rfc7523">JWT-CA</a>
        </th>
        <th>
            <a href="https://datatracker.ietf.org/doc/html/rfc8628">DAG</a>
        </th>
        <th>
            <a href="https://datatracker.ietf.org/doc/html/rfc9126">PAR</a>
        </th>
        <th>
            <a href="https://datatracker.ietf.org/doc/html/rfc9101">JAR</a>
        </th>
        <th>
            <a href="https://datatracker.ietf.org/doc/html/rfc9396">RAR</a>
        </th>
        <th>
            <a href="https://datatracker.ietf.org/doc/html/rfc8693">TE</a>
        </th>
        <th>
            <a href="https://datatracker.ietf.org/doc/html/rfc9449">DPoP</a>
        </th>
        <th>
            <a href="https://datatracker.ietf.org/doc/html/rfc8705">mTLS</a>
        </th>
        <th>
            <a href="https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0.html">CIBA</a>
        </th>
        <th>
            <a href="https://openid.net/specs/openid-connect-backchannel-1_0.html">BCLO</a>
        </th>
    </tr>
</thead>
<tbody>
    <tr>
        <!-- SDK -->
        <td><a href="https://github.com/auth0/auth0-java">auth0-java</a></td>
        <!-- OAuth2.1 -->
        <td> :white_check_mark: </td>
        <!-- JWT --> 
        <td> <a href="https://github.com/auth0/java-jwt">:white_check_mark:</a>  </td>
        <!-- PKCE --> 
        <td> <a href="https://auth0.com/blog/pkce-in-web-applications-with-spring-security/">:white_check_mark:</a> </td>
        <!-- JWT-CA -->
        <td> :x:
        </td>
        <!-- DAG -->
        <td> :x:
        </td>
        <!-- PAR -->
        <td>
            <a href="https://javadoc.io/doc/com.auth0/auth0/latest/com/auth0/client/auth/AuthAPI.html#pushedAuthorizationRequest(java.lang.String,java.lang.String,java.util.Map)">:white_check_mark:</a>
        </td>
        <!-- JAR -->
        <td>
            <a href="https://javadoc.io/doc/com.auth0/auth0/latest/com/auth0/client/auth/AuthAPI.html#authorizeUrlWithJAR(java.lang.String)">:white_check_mark:</a>
        </td>
        <!-- RAR -->
        <td>
            <a href="https://javadoc.io/doc/com.auth0/auth0/latest/com/auth0/client/auth/AuthAPI.html#pushedAuthorizationRequest(java.lang.String,java.lang.String,java.util.Map,java.util.List)">:white_check_mark:</a>
        </td>
        <!-- TE -->
        <td> <a href="https://auth0.com/docs/custom-token-exchange-early-access">:x:</a> </td>
        <!-- DPoP -->
        <td> :x: </td>
        <!-- mTLS -->
        <td> :x: </td>
        <!-- CIBA -->
        <td> :x: </td>
        <!-- BCLO -->
        <td> :x: </td>
    </tr>
    <tr>
        <!-- SDK -->
        <td> <a href="https://github.com/auth0-lab/auth0-hono">auth0-hono</a> </td>
        <!-- OAuth 2.1 -->
        <td> :white_check_mark: </td>
        <!-- JWT --> 
        <td>  </td>
        <!-- PKCE --> 
        <td> </td>
        <!-- JWT-CA -->
        <td> 
        </td>
        <!-- DAG -->
        <td> 
        </td>
        <!-- PAR -->
        <td>
        </td>
        <!-- JAR -->
        <td>
        </td>
        <!-- RAR -->
        <td>
        </td>
        <!-- TE -->
        <td>
        </td>
        <!-- DPoP -->
        <td> </td>
        <!-- mTLS -->
        <td> </td>
        <!-- CIBA -->
        <td> </td>
        <!-- BCLO -->
        <td> </td>
    </tr>
</tbody>
</table>

#### Auth0 Specific Features

<table>
<thead>
    <tr>
        <th>SDK</th>
        <th><a href="https://auth0.com/docs/api/management/v2">API2</a></th>
        <th><a href="https://auth0.com/docs/api/authentication/signup/create-a-new-user">Signup</a></th>
        <th><a href="https://auth0.com/docs/api/authentication/resource-owner-password-flow/get-token">ROPG</a></th>
        <th><a href="https://auth0.com/docs/api/authentication#multi-factor-authentication">MFA</a></th>
        <th><a href="https://auth0.com/docs/authenticate/passwordless/implement-login/embedded-login/relevant-api-endpoints">Passwordless</a> </th>
        <th>MCD</th>
        <th>MRRT</th>
        <th>FCAT</th>
        <th>MyAccount/MyOrg</th>
    </tr>
</thead>
<tbody>
    <tr>
        <!-- SDK -->
        <td><a href="https://github.com/auth0/auth0-java">auth0-java</a></td>
        <!-- API2 -->
        <td>:white_check_mark:</td>
        <!-- Signup -->
        <td>:white_check_mark:</td>
        <!-- ROPG -->
        <td>:white_check_mark:</td>
        <!-- MFA -->
        <td></td>
        <!-- Passwordless -->
        <td></td>
        <!-- MCD -->
        <td></td>
        <!-- MRRT -->
        <td></td>
        <!-- FCAT -->
        <td></td>
        <!-- MyAccount-->
        <td></td>
    </tr>
    <tr>
        <!-- SDK -->
        <td></td>
        <!-- API2 -->
        <td></td>
        <!-- Signup -->
        <td></td>
        <!-- ROPG -->
        <td></td>
        <!-- MFA -->
        <td></td>
        <!-- Passwordless -->
        <td></td>
        <!-- MCD -->
        <td></td>
        <!-- MRRT -->
        <td></td>
        <!-- FCAT -->
        <td></td>
        <!-- MyAccount-->
        <td></td>
    </tr>
</tbody>
</table>

### Browser SDKs
<table>
<thead>
    <tr>
        <th>SDK</th>
        <th>geTokenSilently(cookie)</th>
        <th>geTokenSilently(RRT)</th>
        <th>loginWithPopup</th>
    </tr>
</thead>
<tbody>
    <tr>
        <!-- SDK -->
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</tbody>
</table>

### Native SDKs

<table>
<thead>
    <tr>
        <th>SDK</th>
        <th>Native Apple</th>
        <th>Native Google</th>
        <th>Native Facebook</th>
        <th><a href="https://auth0.com/docs/native-passkeys-api">Native Passkey</a></th>
        <th>Native to Web</th>
        <th>Attestation</th>
    </tr>
</thead>
<tbody>
    <tr>
        <!-- Auth0.Android SDK -->
        <td><a href="https://github.com/auth0/Auth0.Android">Auth0.Android</a></td>
        <!-- SIWA -->
        <td>N/A</td>
        <!-- Google -->
        <td></td>
        <!-- Facebook -->
        <td></td>
        <!-- Passkey -->
        <td></td>
        <!-- NTW -->
        <td></td>
        <!-- Attestation -->
        <td></td>
    </tr>
    <tr>
        <!-- Auth0.swift SDK -->
        <td><a href="https://github.com/auth0/Auth0.swift">Auth0.swift</a></td>
        <!-- SIWA -->
        <td><a href="https://auth0.com/docs/quickstart/native/ios-swift">:white_check_mark:</a></td>
        <!-- Google -->
        <td></td>
        <!-- Facebook -->
        <td></td>
        <!-- Passkey -->
        <td></td>
        <!-- NTW -->
        <td></td>
        <!-- Attestation -->
        <td></td>
    </tr>
    <tr>
        <!-- react-native-auth0 SDK -->
        <td><a href="https://github.com/auth0/react-native-auth0">react-native-auth0</a></td>
        <!-- SIWA -->
        <td></td>
        <!-- Google -->
        <td></td>
        <!-- Facebook -->
        <td></td>
        <!-- Passkey -->
        <td></td>
        <!-- NTW -->
        <td></td>
        <!-- Attestation -->
        <td></td>
    </tr>
    <tr>
        <!-- auth0-flutter SDK -->
        <td><a href="https://github.com/auth0/auth0-flutter">auth0-flutter</a></td>
        <!-- SIWA -->
        <td></td>
        <!-- Google -->
        <td></td>
        <!-- Facebook -->
        <td></td>
        <!-- Passkey -->
        <td></td>
        <!-- NTW -->
        <td></td>
        <!-- Attestation -->
        <td></td>
    </tr>
</tbody>
</table>


## SDK Graph

![SDK graph](./graph/authentication.png)

## Sample User

* Database: `user@atko.email`
* Password: `awk -F= '/^auth0_sample_password/{print $2}' ./tf/terraform.auto.tfvars`

