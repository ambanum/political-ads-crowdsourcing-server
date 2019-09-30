Server allowing to get and annotate political ads

## API

### `GET /random`

Randomly returns ads

#### Query parameters

| Name  | Required | Description | Example |
| ----- | -------- | ----------- | ------- |
| nb_ads | optional | The max number of ads you want to get | 7 |

#### Example Request

	GET /random?nb_ads=1

#### Example Response

```
[
    {
        "_id": "5cdf0410744212a2e1f72b2d",
        "ad_creative_body": "❌ 1 femme sur 3 dans le monde a été victime de violence dans sa vie ! Les violences sont un problème de santé publique majeur, ainsi qu’une grave violation des droits humains fondamentaux. Avec nous, défendez les droits des femmes !  ⤵",
        "ad_creative_link_caption": "JE.SIGNE",
        "ad_creative_link_title": "Je signe, et toi ?",
        "ad_delivery_start_time": "2019-03-22T11:34:39+0000",
        "currency": "EUR",
        "ad_creation_time": "2019-03-22T11:34:39+0000",
        "page_name": "Médecins du Monde France",
        "ad_creative_link_description": "Montrons que le sort des femmes compte pour nous.",
        "impressions": {…},
        "demographic_distribution": […],
        "page_id": "265420476920",
        "spend": {…},
        "region_distribution": […],
        "ad_snapshot_url": …,
        "ad_id": "264673127805481",
        "snapshot": {…}
    }
]
```

### `GET /counts`

Returns the count of ads and annotations.

#### Example Request

	GET /counts

#### Example Response

```
{
"adsCount": 12838,
"annotationsCount": 2135
}
```

### `GET /annotations/:type?`

Returns all annotations or only annotations with the type specified in URL.

#### URL parameters

| Description | Example |
| ----------- | ------- |
| `:type` is the annotation's type to returns and should be one of `survey`, `promotes-candidates`, `new-controversial-element`, `nothing-suspect`, `cant-say`, `not-related-to-politics`. | `survey`

#### Example Request

	GET /annotations/survey

#### Example Response

```
{
    "results": […],
    "pagination": {
        "total": 2135,
        "skip": 0,
        "limit": 100
    }
}
```

### `POST /political-ads/:adId/annotation`

Create an annotations for the specified ad.

#### URL parameters

| Description | Example |
| ----------- | ------- |
| `:adId` is the Facebook ID of the ad to annotate | `680971642351510`

#### Example Request

	POST /political-ads/680971642351510/annotation
	{
		"value": "survey"
	}

#### Example Response

```
{
  "id": "680971642351510"
}
```

- - -

## Utils

You can export annotated ads in CSV format with the script `export_ads_annotations.js` by running the command:

```sh
node scripts/export_ads_annotations.js
```

You can find the result in the `ads_annotations.csv` file created.

- - -

## Development

This API is built with [Node](https://nodejs.org/en/). You will need to [install it](https://nodejs.org/en/download/) to run this API.
You will also need a MongoDB database with some ads, you can check [political-ads-scraper](https://github.com/ambanum/political-ads-scraper) to scrape political-ads and to populate your database.

### Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/ambanum/political-ads-legality-server.git
cd political-ads-legality-server
npm install
```

### Usage

Start the server:

```sh
SALT=abc npm start
```

## Deployment

Clone the repository on your server install dependencies and create a `.env` file at the root of the project containing a salt for encryption, for example:

```
SALT="abc"
```

Then, run the webserver.
We suggest to use a production process manager for Node.js like [pm2](https://github.com/Unitech/pm2) or [Forever](https://github.com/foreversd/forever#readme).

- - -

# License

The code for this software is distributed under the European Union Public Licence (EUPL) v1.2.

Contact the author if you have any specific need or question regarding licensing.
