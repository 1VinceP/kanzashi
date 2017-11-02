DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Orders;

------------------------------------------------------------------------- USERS TABLE

CREATE TABLE Users
(
    id SERIAL PRIMARY KEY,
    username TEXT,
    email TEXT,
    street1 TEXT,
    street2 TEXT,
    city TEXT,
    state TEXT,
    zip INTEGER,
    orderId INTEGER,
    auth_id TEXT
);

INSERT INTO Users
    ( username, email, street1, street2, city, state, zip, orderId, auth_id )
    VALUES
        ( 'vincent', 'myemail@gmail.com', '1776 Bald Eagle Ave', null, 'Provo', 'Utah', 98765, null, null ),
        ( 'Steven', 'me@email.com', '1097 Northridge Rd', null, 'Columbus', 'Ohio', 47589, null, null );

------------------------------------------------------------------------- PRODUCTS TABLE

CREATE TABLE Products
 (
     id SERIAL PRIMARY KEY,
     type TEXT,
     material TEXT,
     baseColor TEXT,
     secondaryColor TEXT,
     decoration TEXT,
     decoColor TEXT,
     decoColor2 TEXT,
     centerCandle TEXT,
     centerGlass TEXT,
     centerBase TEXT,
     request VARCHAR(300),
     imgUrl TEXT,
     creatorId INTEGER,
     paid BOOLEAN,
     shipped BOOLEAN,
     quantity INTEGER,
     new_id INTEGER REFERENCES users( id )
 );

 INSERT INTO Products
    ( type, material, baseColor, secondaryColor, decoration, decoColor, decoColor2, centerCandle, centerBase, request, imgUrl, creatorId, paid, shipped, quantity )
    VALUES
        -- Headbands
        ( 'headband', 'ribbon', 'lavender', 'white', 'butterfly', 'pink', '', '', '', '', 'https://photos-2.dropbox.com/t/2/AADFz574Y9bpZ60sXu-F-xH0Aha_b3Ri_DJhc88firHPHg/12/632623851/jpeg/32x32/1/_/1/2/DSCF9125.JPG/EMiZ0eAFGDYgBygH/Shs4Pjg5VDm0tnoCbQUYShCFd9A_sF7RwoOrjT5F3xA?size=1280x960&size_mode=3', 1, false, true, 1 ),
        ( 'headband', 'ribbon', 'sky blue', 'white', 'rose', 'yellow', '', '', '', 'Double rose design', 'https://photos-6.dropbox.com/t/2/AAAnbmQAuI8lm0dKVMLw5PywLR5AV2QwAGYWfhsG53sY-g/12/632623851/jpeg/32x32/1/_/1/2/DSCF9129.JPG/EMiZ0eAFGDYgBygH/V60MDm2dVDuvblDGLYgHKZ0BBCVOK7IFsEzYT_Sz5K8?size=1280x960&size_mode=3', 1, false, false, 2 ),
        ( 'headband', 'ribbon', 'pink', '', 'other-flower', 'navy-blue', '', '', '', 'spikey with jewels in center. Lots of jewels, because I like them', 'https://photos-3.dropbox.com/t/2/AAClzqd8PEE_0EiogZA33nPa9XNanVcKtisMuKfukfNr3Q/12/632623851/jpeg/32x32/1/_/1/2/DSCF9142.JPG/EMiZ0eAFGPMBIAcoBw/HH8KRrw_97wKXkxAq0mIAuah0lmgtcZtkE8J9w-XFs4?size=1280x960&size_mode=3', 1, true, false, 1 ),
        ( 'headband', 'ribbon', 'white', 'green', 'other-flower', 'pink', '', '', '', 'Green leaves on the flower', 'https://photos-6.dropbox.com/t/2/AACHRmtQTCc1rzocwdBBd2ZFny1dOCIXeMjalb4dshQKkA/12/632623851/jpeg/32x32/1/_/1/2/DSCF9132.JPG/EMiZ0eAFGPUBIAcoBw/l5XcAIoGgn4eHCb54-6eoZT85PjplCNku-zp-MImvIs?size=1280x960&size_mode=3', 1, true, true, 3 ),
        ( 'headband', 'ribbon', 'silver', 'green', 'rose', 'pink', '', '', '', '', 'https://photos-2.dropbox.com/t/2/AADD6WmHquPfPEAfdYPPgm3GgCT6cxP2grCLUThDTsimMg/12/632623851/jpeg/32x32/1/_/1/2/DSCF9161.JPG/EMiZ0eAFGPUBIAcoBw/7mHBueZfbZ0yNgmz31j62HZHRlQXRJNpWXtOk8vX1Og?size=1280x960&size_mode=3', 1, true, false, 1 ),
        -- Flowers
        ( 'flower', 'ribbon', 'orange', 'white', 'pearl', 'white', '', '', '', '', 'https://photos-3.dropbox.com/t/2/AAC1MnlN50lkTPbrevqvDI_LHSleRaZvqw0wXu8l0nPZiQ/12/632623851/jpeg/32x32/1/_/1/2/DSCF9186.JPG/EMiZ0eAFGPMBIAcoBw/zSRDBV0vTSp8kdvz1GMDXcdqf3RLuVk1Xle8bS5gZKY?size=1280x960&size_mode=3', 1, true, true, 2 ),
        ( 'flower', 'ribbon', 'orange', 'yellow', 'jewel', 'white', '', '', '', '', 'https://photos-4.dropbox.com/t/2/AABwb0Dm48mGJegJ6OSv0qIfdZV4V7-XNQEKsEOxFovhew/12/632623851/jpeg/32x32/1/_/1/2/DSCF9171.JPG/EMiZ0eAFGPMBIAcoBw/eW84gXbqrrKwrOOvmRvye903FGQTwYVulz4RMXY4Q6k?size=1280x960&size_mode=3', 1, true, true, 1 ),
        ( 'flower', 'ribbon', 'red', 'black', 'other-flower', 'red', '', '', '', 'Inside flower same as main flower', 'https://photos-1.dropbox.com/t/2/AAA_5x5BFJS-b4NJrStQHiaf-EFeMw6I0C7rBqn7snsobA/12/632623851/jpeg/32x32/1/_/1/2/DSCF9191.JPG/EMiZ0eAFGPUBIAcoBw/rc68U-Ektg3xWZlRTfvL94SFD1SZZKJOuy0sUxNAZ0o?size=1280x960&size_mode=3', 1, false, false, 4 ),
        -- Centerpieces
        ( 'centerpiece', 'ribbon', 'navy-blue', 'white', 'rose', '', '', 'enclosed', 'round mirror', '', 'https://photos-3.dropbox.com/t/2/AAAEMzvMRe1MtHhMI4qxMKLS9gPOnLu0-CZW1KyGBUgj0g/12/632623851/jpeg/32x32/1/_/1/2/DSCF9254.JPG/EMiZ0eAFGPMBIAcoBw/qq_CVXxaRwyh_XlOwvwb9CEYt_Q5UziueignuzIhyCM?size=1280x960&size_mode=3', 1, true, false, 3 ),
        ( 'centerpiece', 'ribbon', 'navy-blue', 'silver', 'other-flower', '', '', 'open-tall', 'round-mirror', '', 'https://photos-4.dropbox.com/t/2/AADyJAzYK43aC7C1JoAi0AJyHcYVFCAo6z4WIcAANTc-3g/12/632623851/jpeg/32x32/1/_/1/2/fullsizeoutput_1e8a.jpeg/EMiZ0eAFGPUBIAcoBw/PDwEQr6_Om7CONMIpcqsrOWMzX0OJ9DFd2k3A7w9PdY?size=1280x960&size_mode=3', 1, false, false, 8 ),
        ( 'centerpiece', 'ribbon', 'pink', 'white', 'other-flower', 'navy-blue', '', 'free', 'yellow-rocks', '', 'https://photos-3.dropbox.com/t/2/AACFxvUew07RexD9oKpmvRPzUpmoQ6eiR0VfTgjm3mJQ7Q/12/632623851/jpeg/32x32/1/_/1/2/Blue%20Band%20Round.JPG/EMiZ0eAFGPUBIAcoBw/PA7uiZ-WD8M6R9J_ZgkjQ-gUL2CsrrToCGCzHNy4UuQ?size=1280x960&size_mode=3', 1, true, false, 4 ),
        ( 'centerpiece', '', '', '', '', '', '', '', '', '', 'https://photos-2.dropbox.com/t/2/AAB02MnpDa5QfA244hcTdamWYXaak3GxaxxVkk7HKH0uoQ/12/632623851/jpeg/32x32/1/_/1/2/Twist%20Full%202.jpg/EMiZ0eAFGPUBIAcoBw/HDIoNZadAibRQxiHuNliuotBdbWgmbqNDh0Rbt6zsYg?size=1280x960&size_mode=3', 1, false, false, 6 );