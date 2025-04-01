# Auth0 SDK Gallery with Terraform

Collection of sample codes using [Auth0 SDK libraries](https://auth0.com/docs/libraries)
and [Auth0 Terraform provider](https://registry.terraform.io/providers/auth0/auth0/latest/docs).

* [next.js](./next.js/readme.md)
* [java](./java/readme.md)

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
        <td> <a href="https://github.com/auth0/auth0-java">auth0-java</a></td>
        <!-- OAuth 2.1 -->
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
        <td>
        </td>
        <!-- DPoP -->
        <td> :x: </td>
        <!-- mTLS -->
        <td> :x: </td>
        <!-- CIBA -->
        <td> :x: </td>
        <!-- BCLO -->
        <td> :x: </td>
    </tr>
</tbody>
</table>

#### Auth0 Specific Features

| SDK | API2 | MFA | MCD | MRRT | FCAT | Native Passkey | MyAccount | Passwordless | Organizations | HTTP Client | Session
Storage |
| ---- | ---- | --- | ---- | ------ | ------ | ---------------- | ----------- | ------------ | ------------- |-------- | ----- |
| <a href="https://github.com/auth0/auth0-java">auth0-java</a> | x | xxx |

## Sample User

* Database: `user@atko.email`
* Password: see `./tf/terraform.auto.tfvars`

## SDK Graph

![SDK graph](./graph/authentication.png)