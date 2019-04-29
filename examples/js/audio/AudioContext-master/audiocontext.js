/**
 * AudioContext.plus() returns an AudioContext
 * where AudioNode.connect will return a Connection instead of void.
 * On those you can call either connect or disconnect repeatedly.
 * You can also create virtual connection which are not connected immediately.
 *
 * AudioNode.disconnect will throw an error for now.
 *
 * Since this code is observing all connections it could be easily improved
 * to print the expected processing sequence in topological order by adding a graph.
 *
 * This code has been developed in defrac.com for audiotool.com and ported to pure JS.
 *
 * Might not work in Safari because it still needs a webkit prefix.
 *
 * @author André Michelle andre.michelle@gmail.com
 */

AudioContext.plus = function ()
{
	var context = new AudioContext();

	/**
	 * Add all creation functions that might be available in future
	 */
	var AudioNodeCreationMethodName = [
		"createBufferSource",
		"createMediaElementSource",
		"createMediaStreamSource",
		"createGain",
		"createDelay",
		"createBiquadFilter",
		"createWaveShaper",
		"createPanner",
		"createConvolver",
		"createDynamicsCompressor",
		"createAnalyser",
		"createScriptProcessor",
		"createStereoPanner",
		"createOscillator",
		"createChannelSplitter",
		"createChannelMerger"
	];

	var hash = 0; // we need a hash for storing all outgoing connections for each OutputNode
	var outgoingMap = {};

	var Connection = function ( outputNode, inputNode, outputIndex, inputIndex )
	{
		this.outputNode = outputNode;
		this.inputNode = inputNode;
		this.outputIndex = outputIndex;
		this.inputIndex = inputIndex;
		this.connected = false; // readonly
	};

	Connection.prototype = {
		connect: function ()
		{
			if( !this.connected )
			{
				this.outputNode.__proto__.connect.call( this.outputNode, this.inputNode, this.outputIndex, this.inputIndex );
				getOrCreateConnections( this.outputNode ).push( this );
				this.connected = true;
			}
			return this;
		},
		disconnect: function ()
		{
			if( this.connected )
			{
				var connections = getConnections( this.outputNode );
				var spliceIndex = connections.indexOf( this );
				if( -1 == spliceIndex )
					throw new Error( "Trying to disconnect unknown connection" );
				connections.splice( spliceIndex, 1 );
				this.outputNode.__proto__.disconnect.call( this.outputNode );
				if( 0 == connections.length )
					delete outgoingMap[this.outputNode.hash];
				else
				{
					var n = connections.length;
					for( var i = 0; i < n; ++i )
					{
						var connection = connections[i];
						connection.outputNode.__proto__.connect.call( connection.outputNode,
								connection.inputNode, connection.outputIndex, connection.inputIndex );
					}
				}
				this.connected = false;
			}
			return this;
		},
		isConnected: function () { return this.connected; }
	};

	var getOrCreateConnections = function ( outputNode )
	{
		var connections = outgoingMap[outputNode.hash];
		if( !connections )
			connections = outgoingMap[outputNode.hash] = [];
		return connections;
	};

	var getConnections = function ( outputNode )
	{
		var connections = outgoingMap[outputNode.hash];
		if( !connections )
			throw new Error( "No connections hashed for " + outputNode );
		return connections;
	};

	var plus = function ( method, name )
	{
		return function ()
		{
			var outputNode = AudioContext.prototype[name].apply( this, arguments );
			outputNode.hash = hash++;
			outputNode.connect = function ()
			{
				return this.virtual.apply( this, arguments ).connect();
			};
			outputNode.virtual = function ()
			{
				return new Connection( outputNode, arguments[0], arguments[1] | 0, arguments[2] | 0 );
			};
			outputNode.disconnect = function () {
				throw new Error("You have to disconnect by using Connection.disconnect()");
			};
			return outputNode;
		};
	};

	for( var i = AudioNodeCreationMethodName.length - 1; i >= 0; i-- )
	{
		var methodName = AudioNodeCreationMethodName[i];
		context[methodName] = plus( context[methodName], methodName );
	}
	return context;
};