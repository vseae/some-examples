"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
var merkle_tree_1 = require("@openzeppelin/merkle-tree");
var fs = require("fs");
var readline = require("readline");
// read csv file and return array of array
function readCSVToArray(file_path) {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function () {
        var data, stream, rl, rl_1, rl_1_1, line, values, e_1_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    data = [];
                    stream = fs.createReadStream(file_path, "utf-8");
                    rl = readline.createInterface({ input: stream });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 12]);
                    rl_1 = __asyncValues(rl);
                    _b.label = 2;
                case 2: return [4 /*yield*/, rl_1.next()];
                case 3:
                    if (!(rl_1_1 = _b.sent(), !rl_1_1.done)) return [3 /*break*/, 5];
                    line = rl_1_1.value;
                    values = line
                        .split(",")
                        .map(function (value) { return value.trim().replace(/"/g, ""); });
                    data.push(values);
                    _b.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _b.trys.push([7, , 10, 11]);
                    if (!(rl_1_1 && !rl_1_1.done && (_a = rl_1["return"]))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(rl_1)];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [2 /*return*/, data];
            }
        });
    });
}
// generate merkle tree from csv file
function generateTree() {
    return __awaiter(this, void 0, void 0, function () {
        var filePath, data, tree;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filePath = "scripts/merkle/whitelist.csv";
                    return [4 /*yield*/, readCSVToArray(filePath)];
                case 1:
                    data = _a.sent();
                    console.log(data);
                    tree = merkle_tree_1.StandardMerkleTree.of(data, ["address", "uint256"]);
                    console.log("Merkle Root:", tree.root);
                    fs.writeFileSync("scripts/merkle/tree.json", JSON.stringify(tree.dump()));
                    return [2 /*return*/, tree];
            }
        });
    });
}
// main function
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var tree, _i, _a, _b, i, v, proof, root;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, generateTree()];
                case 1:
                    tree = _c.sent();
                    for (_i = 0, _a = tree.entries(); _i < _a.length; _i++) {
                        _b = _a[_i], i = _b[0], v = _b[1];
                        proof = tree.getProof(i);
                        root = tree.root;
                        console.log("Index:", i);
                        console.log("Value:", v);
                        console.log("Proof:", proof);
                        console.log("Root:", root);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
main();
