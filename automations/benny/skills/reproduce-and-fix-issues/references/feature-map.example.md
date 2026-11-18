# Example staging feature map

## B2B registration

- Route and entry points to map include the direct registration URL, account navigation, and merchant-specific registration templates represented in staging.
- Fixtures include a disposable synthetic customer address, valid and invalid passwords, and staging-only downstream integration or event capture.
- Record form response, durable customer state where visible through an approved staging view, and whether a temporary create/delete event is emitted. For a deletion-notification report, observe the staging integration or authorized test event sink. Form success alone cannot verify notification behavior.
- Record the preview startup method, running revision marker, staging environment marker, and fixture-reset steps in the project map.
