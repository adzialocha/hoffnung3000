---
layout: default
title: Usage Guide
order: 3
---

* Table of contents
{:toc}

## Navigation

The HOFFNUNG 3000 page consists of three sections which help you to navigate through the platform:

* **Content**: the main area
* **Navigation**: click on the menu button in the top left corner to open it, from here you can reach all important pages
* **Sidebar**: click on the button in the top right corner to expand it, here you find all social features like the *activity stream*, *your message inbox*, the *random meeting tool* or buttons to *log out* or *change your profile*

## Roles

Users can have three different roles on HOFFNUNG 3000:

* **Visitors**: Have access to the calendar and gif-stream (when enabled)
* **Participants**: Can use all tools to create and share resources, places and events. They can write messages to each other, see the activity stream and use the random meetings tool
* **Admins**: Have access to the admin panel to create, update and delete users, change permissions and customize the platform

## Admins

##### Change the default admin user

After a fresh install and database setup a default admin user was created for you. You should change that user after the installation:

1. Log in with the initial admin user account, Email: `admin@domain.com`, Password: `adminadmin`

2. Change your password by clicking `Profile` at the bottom of the sidebar

3. Open the navigation and click `Admin`, then click `Users`, select your user by clicking `Edit`, change the email address to your own, now click `Save`

##### Manage users

Click on `Users` in the `Admin` page and select a given user via `Edit` or create a new one by clicking `New User`. You can define the users address, name and contact details. Use the `Administrator`, `Participates at festival` or `Visitor` checkboxes to assign permissions to the user. Click `Account is enabled (Payment accepted)` to activate the account (otherwise the user wont be able to log in).

Use the activation checkbox to handle for example bank wire transfers for ticket sales. Users who bought their tickets via PayPal are automatically activated on successful checkout.

##### Change texts

Click on `Pages` in the `Admin` page to change the contents of all pages. Use [Markdown](https://commonmark.org/help/) to format your texts. Some pages have different variations, depending on the context:

* `registration-full` is shown when the number of max. partipants has been reached, `registration-intro` displayed right in the beginning of participation sign up and `registration-payment` during checkout
* `ticket-intro` is shown for the ticket sales page, `ticket-payment` during ticket checkout
* `calendar-public` is a text which will be displayed to calendar visitors who are not logged in, `calendar` is shown when the users are logged in

To change email texts or other parts of the page you have to change parts of the source code. Read the [development](development.html) section for more details.

##### Change title, description, localization, timeframe etc.

Click on `Config` in the `Admin` page. You see the following settings which can be used to customize the platform to your needs:

* Change `URL` to your current domain to make sure people receive the right links
* Use `Title`, `Short description` to give the platform a different name and description
* Fill in the main email-address in `Email-address of admin / website owner` and use the same or another one for automated messages which are sent to users: `Email-address of automated mail sender`
* Change the default for creating new places: `Default city name`, `Default country name`, `Default GPS position: Latitude`, `Default GPS position: Longitude`
* Change the `Currency` for ticket sales when necessary, please use one of the following [currency codes](https://developer.paypal.com/docs/api/reference/currency-codes/)
* Define a `Start of festival` and `End of festival` to set the timeframe of the whole thing, please make sure to use the following format: *YYYY-MM-DD*. You can set a very large timeframe if you want to use HOFFNUNG 3000 for constant use.

##### Ticket sales configuration

HOFFNUNG 3000 offers two separate ticket sales / checkouts for visitors and participants (see *Roles* above for details on the different user roles). You can activate/deactivate each regarding checkout, limit the amount of tickets or change the prices.

Use `Maximum number of participants` to define a ticket limit for participants. Set it to 0 if you don't want to limit the amount. Define a `Visitor ticket price` and `Participant ticket price` (*15.12* stands for example for 15,12 Euro). Set the prices to 0 if you want to give free entrance.

Toggle the `Activate partipant ticket sales`, or `Activate visitor ticket sales` if you want to turn on/off the sale pages.

##### Payment configuration

To offer bank wire transfer payment fill out the following fields: `Receiver name`, `Bank name`, `IBAN`, `BIC`. If you want to use PayPal for payment you have to change your server configuration. Please read about it [here](/installation.html).

##### Activate or deactivate features

You can turn on/off features depending on your needs. Maybe you dont want to anonymize your users or you want to turn of the built-in messenger. Use the following checkboxes to do so: `Use activity stream`, `Use anonymized animal avatars for users`, `Use messaging`, `Use random meetings`.

##### Display YouTube videos

You can display a YouTube video on the homepage by setting the video ID here: `Homepage video ID` (this is the ID: *https://www.youtube.com/watch?v=**ux2R9jwEIgw***).

If you want participants to watch a YouTube video before signup you can set a `Sign up video ID`.

##### Use the gif-stream

Fill out the `gif-stream Server URL` field with your URL to enable this feature (make sure to remove any trailing slashes from the URL). The platform automatically connects to the gif-stream then. Note that you have to [set up](/installation.html) the [gif-stream-server](https://github.com/adzialocha/gif-stream-server) before.

---

## Self-curation

##### Manage resources

##### Manage places

##### Manage events

---

## Sidebar

##### Random meetings

##### Activity stream

##### Inbox and messages
