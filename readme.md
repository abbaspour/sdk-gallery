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
            <a href="https://datatracker.ietf.org/doc/draft-ietf-oauth-v2-1/">OAuth 2.1</a>
        </th>
<th>
PKCE [RFC 7636](https://datatracker.ietf.org/doc/html/rfc7636)
</th>
<th>
DAG [RFC 8628](https://datatracker.ietf.org/doc/html/rfc8628)
</th>
<th>
PAR [RFC 9126](https://datatracker.ietf.org/doc/rfc9126/)
</th>
<th>
JAR [RFC 9101](https://datatracker.ietf.org/doc/html/rfc9101)
</th>
<th>
RAR [RFC 9396](https://datatracker.ietf.org/doc/html/rfc9396)
</th>
<th>
TE [RFC 8693](https://datatracker.ietf.org/doc/html/rfc8693)
</th>
<th>
DPoP [RFC 9449](https://datatracker.ietf.org/doc/html/rfc9449)
</th>
<th>
mTLS [RFC 8705](https://datatracker.ietf.org/doc/html/rfc8705)
</th>
<th>
[CIBA](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0.html)
</th>
<th>
[BCLO](https://openid.net/specs/openid-connect-backchannel-1_0.html)
</th>
<th>
</th>
<th>
</th>
    </tr>
</thead>
</table>


#### Auth0 Specific Features

| language | MCD | MRRT | FCAT |

## Sample User

* Database: `user@atko.email`
* Password: see `./tf/terraform.auto.tfvars`

## SDK Graph

![SDK graph](./graph/authentication.png)