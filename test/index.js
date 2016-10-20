/**
 * Copyright (c) 2016 Sqreen. All Rights Reserved.
 * Please refer to our terms for more information: https://www.sqreen.io/terms.html
 */
'use strict';
const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const afterEach = lab.afterEach;

const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

const Decache = require('decache');

describe('module', () => {

    describe('fetch', () => {

        afterEach((done) => {

            Decache('wreck');
            done();
        });

        it('should call the API to get the list of the known exit nodes', { plan: 3 }, (done) => {

            Decache('wreck');
            const Wreck = require('wreck');
            Wreck.get = function (url, options, cb) {

                expect(url).to.equal('http://xxx.sqreen.io/sqreen/v0/ips/tor/exit_nodes');
                expect(options).to.equal({ headers: { accept: 'application/json' }, json: true });
                return cb(null, { statusCode: 200 },{ date: new Date(), list: [] });
            };

            const Main = require('../index');

            Main.fetch((err) => {

                expect(err).to.not.exist();
                done();
            });
        });
    });
});
