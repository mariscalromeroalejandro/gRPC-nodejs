// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var calculator_pb = require('./calculator_pb.js');

function serialize_calculator_AvgRequest(arg) {
  if (!(arg instanceof calculator_pb.AvgRequest)) {
    throw new Error('Expected argument of type calculator.AvgRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_AvgRequest(buffer_arg) {
  return calculator_pb.AvgRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_AvgResponse(arg) {
  if (!(arg instanceof calculator_pb.AvgResponse)) {
    throw new Error('Expected argument of type calculator.AvgResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_AvgResponse(buffer_arg) {
  return calculator_pb.AvgResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_PrimeRequest(arg) {
  if (!(arg instanceof calculator_pb.PrimeRequest)) {
    throw new Error('Expected argument of type calculator.PrimeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_PrimeRequest(buffer_arg) {
  return calculator_pb.PrimeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_PrimeResponse(arg) {
  if (!(arg instanceof calculator_pb.PrimeResponse)) {
    throw new Error('Expected argument of type calculator.PrimeResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_PrimeResponse(buffer_arg) {
  return calculator_pb.PrimeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_SumRequest(arg) {
  if (!(arg instanceof calculator_pb.SumRequest)) {
    throw new Error('Expected argument of type calculator.SumRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_SumRequest(buffer_arg) {
  return calculator_pb.SumRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_SumResponse(arg) {
  if (!(arg instanceof calculator_pb.SumResponse)) {
    throw new Error('Expected argument of type calculator.SumResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_SumResponse(buffer_arg) {
  return calculator_pb.SumResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var CalculatorServiceService = exports.CalculatorServiceService = {
  sum: {
    path: '/calculator.CalculatorService/Sum',
    requestStream: false,
    responseStream: false,
    requestType: calculator_pb.SumRequest,
    responseType: calculator_pb.SumResponse,
    requestSerialize: serialize_calculator_SumRequest,
    requestDeserialize: deserialize_calculator_SumRequest,
    responseSerialize: serialize_calculator_SumResponse,
    responseDeserialize: deserialize_calculator_SumResponse,
  },
  primes: {
    path: '/calculator.CalculatorService/Primes',
    requestStream: false,
    responseStream: true,
    requestType: calculator_pb.PrimeRequest,
    responseType: calculator_pb.PrimeResponse,
    requestSerialize: serialize_calculator_PrimeRequest,
    requestDeserialize: deserialize_calculator_PrimeRequest,
    responseSerialize: serialize_calculator_PrimeResponse,
    responseDeserialize: deserialize_calculator_PrimeResponse,
  },
  avg: {
    path: '/calculator.CalculatorService/Avg',
    requestStream: true,
    responseStream: false,
    requestType: calculator_pb.AvgRequest,
    responseType: calculator_pb.AvgResponse,
    requestSerialize: serialize_calculator_AvgRequest,
    requestDeserialize: deserialize_calculator_AvgRequest,
    responseSerialize: serialize_calculator_AvgResponse,
    responseDeserialize: deserialize_calculator_AvgResponse,
  },
};

exports.CalculatorServiceClient = grpc.makeGenericClientConstructor(CalculatorServiceService, 'CalculatorService');
