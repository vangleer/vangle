---
title: Message
lang: en-US
---

# Message

Used to show feedback after an activity. The difference with Notification is that the latter is often used to show a system level passive notification.

## Basic usage

Displays at the top, and disappears after 3 seconds.

:::demo The setup of Message is very similar to notification, so parts of the options won't be explained in detail here. You can check the options table below combined with notification doc to understand it. Element Plus has registered a `$message` method for invoking. Message can take a string or a VNode as parameter, and it will be shown as the main body.

message/basic

:::

## Types

Used to show the feedback of Success, Warning, Message and Error activities.

:::demo When you need more customizations, Message component can also take an object as parameter. For example, setting value of `type` can define different types, and its default is `info`. In such cases the main body is passed in as the value of `message`. Also, we have registered methods for different types, so you can directly call it without passing a type like `open4`.

message/different-types

:::