```
node --v8-options
SSE3=1 SSSE3=1 SSE4_1=1 SAHF=1 AVX=1 FMA3=0 BMI1=0 BMI2=0 LZCNT=0 POPCNT=1 ATOM=0
Usage:
  shell [options] -e string
    execute string in V8
  shell [options] file1 file2 ... filek
    run JavaScript scripts in file1, file2, ..., filek
  shell [options]
  shell [options] --shell [file1 file2 ... filek]
    run an interactive JavaScript shell
  d8 [options] file1 file2 ... filek
  d8 [options]
  d8 [options] --shell [file1 file2 ... filek]
    run the new debugging shell
```

Options:
  --experimental_extras (enable code compiled in via v8_experimental_extra_library_files)
        type: bool  default: false
  --use_strict (enforce strict mode)
        type: bool  default: false
  --es_staging (enable test-worthy harmony features (for internal use only))
        type: bool  default: false
  --harmony (enable all completed harmony features)
        type: bool  default: false
  --harmony_shipping (enable all shipped harmony features)
        type: bool  default: true
  --harmony_array_prototype_values (enable "harmony Array.prototype.values" (in progress))
        type: bool  default: false
  --harmony_function_sent (enable "harmony function.sent" (in progress))
        type: bool  default: false
  --harmony_tailcalls (enable "harmony tail calls" (in progress))
        type: bool  default: false
  --harmony_sharedarraybuffer (enable "harmony sharedarraybuffer" (in progress))
        type: bool  default: false
  --harmony_do_expressions (enable "harmony do-expressions" (in progress))
        type: bool  default: false
  --harmony_regexp_named_captures (enable "harmony regexp named captures" (in progress))
        type: bool  default: false
  --harmony_regexp_property (enable "harmony unicode regexp property classes" (in progress))
        type: bool  default: false
  --harmony_function_tostring (enable "harmony Function.prototype.toString" (in progress))
        type: bool  default: false
  --harmony_class_fields (enable "harmony public fields in class literals" (in progress))
        type: bool  default: false
  --harmony_async_iteration (enable "harmony async iteration" (in progress))
        type: bool  default: false
  --harmony_dynamic_import (enable "harmony dynamic import" (in progress))
        type: bool  default: false
  --harmony_promise_finally (enable "harmony Promise.prototype.finally" (in progress))
        type: bool  default: false
  --harmony_regexp_lookbehind (enable "harmony regexp lookbehind")
        type: bool  default: false
  --harmony_restrictive_generators (enable "harmony restrictions on generator declarations")
        type: bool  default: false
  --harmony_object_rest_spread (enable "harmony object rest spread properties")
        type: bool  default: false
  --harmony_template_escapes (enable "harmony invalid escapes in tagged template literals")
        type: bool  default: false
  --harmony_trailing_commas (enable "harmony trailing commas in function parameter lists")
        type: bool  default: true
  --datetime_format_to_parts (enable "Intl.DateTimeFormat.formatToParts")
        type: bool  default: true
  --icu_case_mapping (enable "case mapping with ICU rather than Unibrow")
        type: bool  default: true
  --future (Implies all staged features that we want to ship in the not-too-far future)
        type: bool  default: false
  --ignition_staging (use ignition with all staged features)
        type: bool  default: false
  --allocation_site_pretenuring (pretenure with allocation sites)
        type: bool  default: true
  --mark_shared_functions_for_tier_up (mark shared functions for tier up)
        type: bool  default: true
  --page_promotion (promote pages based on utilization)
        type: bool  default: true
  --page_promotion_threshold (min percentage of live bytes on a page to enable fast evacuation)
        type: int  default: 70
  --smi_binop (support smi representation in binary operations)
        type: bool  default: true
  --trace_pretenuring (trace pretenuring decisions of HAllocate instructions)
        type: bool  default: false
  --trace_pretenuring_statistics (trace allocation site pretenuring statistics)
        type: bool  default: false
  --track_fields (track fields with only smi values)
        type: bool  default: true
  --track_double_fields (track fields with double values)
        type: bool  default: true
  --track_heap_object_fields (track fields with heap values)
        type: bool  default: true
  --track_computed_fields (track computed boilerplate fields)
        type: bool  default: true
  --track_field_types (track field types)
        type: bool  default: true
  --type_profile (collect type information)
        type: bool  default: false
  --optimize_for_size (Enables optimizations which favor memory size over execution speed)
        type: bool  default: false
  --unbox_double_arrays (automatically unbox arrays of doubles)
        type: bool  default: true
  --string_slices (use string slices)
        type: bool  default: true
  --ignition (use ignition interpreter)
        type: bool  default: false
  --ignition_deadcode (use ignition dead code elimination optimizer)
        type: bool  default: true
  --ignition_osr (enable support for OSR from ignition code)
        type: bool  default: true
  --ignition_peephole (use ignition peephole optimizer)
        type: bool  default: true
  --ignition_reo (use ignition register equivalence optimizer)
        type: bool  default: true
  --ignition_filter_expression_positions (filter expression positions before the bytecode pipeline)
        type: bool  default: true
  --print_bytecode (print bytecode generated by ignition interpreter)
        type: bool  default: false
  --print_bytecode_filter (filter for selecting which functions to print bytecode)
        type: string  default: *
  --trace_ignition (trace the bytecodes executed by the ignition interpreter)
        type: bool  default: false
  --trace_ignition_codegen (trace the codegen of ignition interpreter bytecode handlers)
        type: bool  default: false
  --trace_ignition_dispatches (traces the dispatches to bytecode handlers by the ignition interpreter)
        type: bool  default: false
  --trace_ignition_dispatches_output_file (the file to which the bytecode handler dispatch table is written (by default, the table is not written to a file))
        type: string  default: NULL
  --crankshaft (use crankshaft)
        type: bool  default: true
  --hydrogen_filter (optimization filter)
        type: string  default: *
  --use_gvn (use hydrogen global value numbering)
        type: bool  default: true
  --gvn_iterations (maximum number of GVN fix-point iterations)
        type: int  default: 3
  --use_canonicalizing (use hydrogen instruction canonicalizing)
        type: bool  default: true
  --use_inlining (use function inlining)
        type: bool  default: true
  --use_escape_analysis (use hydrogen escape analysis)
        type: bool  default: true
  --use_allocation_folding (use allocation folding)
        type: bool  default: true
  --use_local_allocation_folding (only fold in basic blocks)
        type: bool  default: false
  --use_write_barrier_elimination (eliminate write barriers targeting allocations in optimized code)
        type: bool  default: true
  --max_inlining_levels (maximum number of inlining levels)
        type: int  default: 5
  --max_inlined_source_size (maximum source size in bytes considered for a single inlining)
        type: int  default: 600
  --max_inlined_nodes (maximum number of AST nodes considered for a single inlining)
        type: int  default: 200
  --max_inlined_nodes_cumulative (maximum cumulative number of AST nodes considered for inlining)
        type: int  default: 400
  --loop_invariant_code_motion (loop invariant code motion)
        type: bool  default: true
  --fast_math (faster (but maybe less accurate) math functions)
        type: bool  default: true
  --collect_megamorphic_maps_from_stub_cache (crankshaft harvests type feedback from stub cache)
        type: bool  default: false
  --hydrogen_stats (print statistics for hydrogen)
        type: bool  default: false
  --trace_check_elimination (trace check elimination phase)
        type: bool  default: false
  --trace_environment_liveness (trace liveness of local variable slots)
        type: bool  default: false
  --trace_hydrogen (trace generated hydrogen to file)
        type: bool  default: false
  --trace_hydrogen_filter (hydrogen tracing filter)
        type: string  default: *
  --trace_hydrogen_stubs (trace generated hydrogen for stubs)
        type: bool  default: false
  --trace_hydrogen_file (trace hydrogen to given file name)
        type: string  default: NULL
  --trace_phase (trace generated IR for specified phases)
        type: string  default: HLZ
  --trace_inlining (trace inlining decisions)
        type: bool  default: false
  --trace_load_elimination (trace load elimination)
        type: bool  default: false
  --trace_store_elimination (trace store elimination)
        type: bool  default: false
  --turbo_verify_store_elimination (verify store elimination more rigorously)
        type: bool  default: false
  --trace_alloc (trace register allocator)
        type: bool  default: false
  --trace_all_uses (trace all use positions)
        type: bool  default: false
  --trace_range (trace range analysis)
        type: bool  default: false
  --trace_gvn (trace global value numbering)
        type: bool  default: false
  --trace_representation (trace representation types)
        type: bool  default: false
  --trace_removable_simulates (trace removable simulates)
        type: bool  default: false
  --trace_escape_analysis (trace hydrogen escape analysis)
        type: bool  default: false
  --trace_allocation_folding (trace allocation folding)
        type: bool  default: false
  --trace_track_allocation_sites (trace the tracking of allocation sites)
        type: bool  default: false
  --trace_migration (trace object migration)
        type: bool  default: false
  --trace_generalization (trace map generalization)
        type: bool  default: false
  --stress_pointer_maps (pointer map for every instruction)
        type: bool  default: false
  --stress_environments (environment for every instruction)
        type: bool  default: false
  --deopt_every_n_times (deoptimize every n times a deopt point is passed)
        type: int  default: 0
  --deopt_every_n_garbage_collections (deoptimize every n garbage collections)
        type: int  default: 0
  --print_deopt_stress (print number of possible deopt points)
        type: bool  default: false
  --trap_on_deopt (put a break point before deoptimizing)
        type: bool  default: false
  --trap_on_stub_deopt (put a break point before deoptimizing a stub)
        type: bool  default: false
  --deoptimize_uncommon_cases (deoptimize uncommon cases)
        type: bool  default: true
  --polymorphic_inlining (polymorphic inlining)
        type: bool  default: true
  --use_osr (use on-stack replacement)
        type: bool  default: true
  --array_bounds_checks_elimination (perform array bounds checks elimination)
        type: bool  default: true
  --trace_bce (trace array bounds check elimination)
        type: bool  default: false
  --array_index_dehoisting (perform array index dehoisting)
        type: bool  default: true
  --analyze_environment_liveness (analyze liveness of environment slots and zap dead values)
        type: bool  default: true
  --load_elimination (use load elimination)
        type: bool  default: true
  --check_elimination (use check elimination)
        type: bool  default: true
  --store_elimination (use store elimination)
        type: bool  default: false
  --dead_code_elimination (use dead code elimination)
        type: bool  default: true
  --fold_constants (use constant folding)
        type: bool  default: true
  --trace_dead_code_elimination (trace dead code elimination)
        type: bool  default: false
  --unreachable_code_elimination (eliminate unreachable code)
        type: bool  default: true
  --trace_osr (trace on-stack replacement)
        type: bool  default: false
  --stress_runs (number of stress runs)
        type: int  default: 0
  --lookup_sample_by_shared (when picking a function to optimize, watch for shared function info, not JSFunction itself)
        type: bool  default: true
  --flush_optimized_code_cache (flushes the cache of optimized code for closures on every GC)
        type: bool  default: false
  --inline_construct (inline constructor calls)
        type: bool  default: true
  --inline_arguments (inline functions with arguments object)
        type: bool  default: true
  --inline_accessors (inline JavaScript accessors)
        type: bool  default: true
  --inline_into_try (inline into try blocks)
        type: bool  default: true
  --escape_analysis_iterations (maximum number of escape analysis fix-point iterations)
        type: int  default: 1
  --concurrent_recompilation (optimizing hot functions asynchronously on a separate thread)
        type: bool  default: true
  --trace_concurrent_recompilation (track concurrent recompilation)
        type: bool  default: false
  --concurrent_recompilation_queue_length (the length of the concurrent compilation queue)
        type: int  default: 8
  --concurrent_recompilation_delay (artificial compilation delay in ms)
        type: int  default: 0
  --block_concurrent_recompilation (block queued jobs until released)
        type: bool  default: false
  --omit_map_checks_for_leaf_maps (do not emit check maps for constant values that have a leaf map, deoptimize the optimized code if the layout of the maps changes.)
        type: bool  default: true
  --turbo (enable TurboFan compiler)
        type: bool  default: false
  --turbo_sp_frame_access (use stack pointer-relative access to frame wherever possible)
        type: bool  default: false
  --turbo_preprocess_ranges (run pre-register allocation heuristics)
        type: bool  default: true
  --turbo_filter (optimization filter for TurboFan compiler)
        type: string  default: ~~
  --trace_turbo (trace generated TurboFan IR)
        type: bool  default: false
  --trace_turbo_graph (trace generated TurboFan graphs)
        type: bool  default: false
  --trace_turbo_cfg_file (trace turbo cfg graph (for C1 visualizer) to a given file name)
        type: string  default: NULL
  --trace_turbo_types (trace TurboFan's types)
        type: bool  default: true
  --trace_turbo_scheduler (trace TurboFan's scheduler)
        type: bool  default: false
  --trace_turbo_reduction (trace TurboFan's various reducers)
        type: bool  default: false
  --trace_turbo_trimming (trace TurboFan's graph trimmer)
        type: bool  default: false
  --trace_turbo_jt (trace TurboFan's jump threading)
        type: bool  default: false
  --trace_turbo_ceq (trace TurboFan's control equivalence)
        type: bool  default: false
  --trace_turbo_loop (trace TurboFan's loop optimizations)
        type: bool  default: false
  --turbo_asm (enable TurboFan for asm.js code)
        type: bool  default: true
  --turbo_verify (verify TurboFan graphs at each phase)
        type: bool  default: false
  --turbo_verify_machine_graph (verify TurboFan machine graph before instruction selection)
        type: string  default: NULL
  --trace_verify_csa (trace code stubs verification)
        type: bool  default: false
  --csa_trap_on_node (trigger break point when a node with given id is created in given stub. The format is: StubName,NodeId)
        type: string  default: NULL
  --turbo_stats (print TurboFan statistics)
        type: bool  default: false
  --turbo_stats_nvp (print TurboFan statistics in machine-readable format)
        type: bool  default: false
  --turbo_splitting (split nodes during scheduling in TurboFan)
        type: bool  default: true
  --function_context_specialization (enable function context specialization in TurboFan)
        type: bool  default: false
  --turbo_inlining (enable inlining in TurboFan)
        type: bool  default: true
  --trace_turbo_inlining (trace TurboFan inlining)
        type: bool  default: false
  --turbo_load_elimination (enable load elimination in TurboFan)
        type: bool  default: true
  --trace_turbo_load_elimination (trace TurboFan load elimination)
        type: bool  default: false
  --loop_assignment_analysis (perform loop assignment analysis)
        type: bool  default: true
  --turbo_profiling (enable profiling in TurboFan)
        type: bool  default: false
  --turbo_verify_allocation (verify register allocation in TurboFan)
        type: bool  default: false
  --turbo_move_optimization (optimize gap moves in TurboFan)
        type: bool  default: true
  --turbo_jt (enable jump threading in TurboFan)
        type: bool  default: true
  --turbo_loop_peeling (Turbofan loop peeling)
        type: bool  default: true
  --turbo_loop_variable (Turbofan loop variable optimization)
        type: bool  default: true
  --turbo_cf_optimization (optimize control flow in TurboFan)
        type: bool  default: true
  --turbo_frame_elision (elide frames in TurboFan)
        type: bool  default: true
  --turbo_escape (enable escape analysis)
        type: bool  default: true
  --turbo_instruction_scheduling (enable instruction scheduling in TurboFan)
        type: bool  default: false
  --turbo_stress_instruction_scheduling (randomly schedule instructions to stress dependency tracking)
        type: bool  default: false
  --turbo_store_elimination (enable store-store elimination in TurboFan)
        type: bool  default: true
  --minimal (simplifies execution model to make porting easier (e.g. always use Ignition, never use Crankshaft)
        type: bool  default: false
  --expose_wasm (expose WASM interface to JavaScript)
        type: bool  default: true
  --assume_asmjs_origin (force wasm decoder to assume input is internal asm-wasm format)
        type: bool  default: false
  --wasm_disable_structured_cloning (disable WASM structured cloning)
        type: bool  default: false
  --wasm_num_compilation_tasks (number of parallel compilation tasks for wasm)
        type: int  default: 10
  --wasm_max_mem_pages (maximum memory size of a wasm instance)
        type: uint  default: 16384
  --wasm_max_table_size (maximum table size of a wasm instance)
        type: uint  default: 10000000
  --trace_wasm_encoder (trace encoding of wasm code)
        type: bool  default: false
  --trace_wasm_decoder (trace decoding of wasm code)
        type: bool  default: false
  --trace_wasm_decode_time (trace decoding time of wasm code)
        type: bool  default: false
  --trace_wasm_compiler (trace compiling of wasm code)
        type: bool  default: false
  --trace_wasm_interpreter (trace interpretation of wasm code)
        type: bool  default: false
  --trace_wasm_ast_start (start function for WASM AST trace (inclusive))
        type: int  default: 0
  --trace_wasm_ast_end (end function for WASM AST trace (exclusive))
        type: int  default: 0
  --trace_wasm_text_start (start function for WASM text generation (inclusive))
        type: int  default: 0
  --trace_wasm_text_end (end function for WASM text generation (exclusive))
        type: int  default: 0
  --skip_compiling_wasm_funcs (start compiling at function N)
        type: int  default: 0
  --wasm_break_on_decoder_error (debug break when wasm decoder encounters an error)
        type: bool  default: false
  --wasm_loop_assignment_analysis (perform loop assignment analysis for WASM)
        type: bool  default: true
  --validate_asm (validate asm.js modules before compiling)
        type: bool  default: false
  --suppress_asm_messages (don't emit asm.js related messages (for golden file testing))
        type: bool  default: false
  --trace_asm_time (log asm.js timing info to the console)
        type: bool  default: false
  --dump_wasm_module (dump WASM module bytes)
        type: bool  default: false
  --dump_wasm_module_path (directory to dump wasm modules to)
        type: string  default: NULL
  --typed_array_max_size_in_heap (threshold for in-heap typed array)
        type: int  default: 64
  --wasm_simd_prototype (enable prototype simd opcodes for wasm)
        type: bool  default: false
  --wasm_eh_prototype (enable prototype exception handling opcodes for wasm)
        type: bool  default: false
  --wasm_mv_prototype (enable prototype multi-value support for wasm)
        type: bool  default: false
  --wasm_atomics_prototype (enable prototype atomic opcodes for wasm)
        type: bool  default: false
  --wasm_opt (enable wasm optimization)
        type: bool  default: true
  --wasm_no_bounds_checks (disable bounds checks (performance testing only))
        type: bool  default: false
  --wasm_no_stack_checks (disable stack checks (performance testing only))
        type: bool  default: false
  --wasm_trap_handler (use signal handlers to catch out of bounds memory access in wasm (experimental, currently Linux x86_64 only))
        type: bool  default: false
  --wasm_guard_pages (add guard pages to the end of WebWassembly memory (experimental, no effect on 32-bit))
        type: bool  default: false
  --wasm_trap_if (enable the use of the trap_if operator for traps)
        type: bool  default: true
  --wasm_code_fuzzer_gen_test (Generate a test case when running the wasm-code fuzzer)
        type: bool  default: false
  --print_wasm_code (Print WebAssembly code)
        type: bool  default: false
  --frame_count (number of stack frames inspected by the profiler)
        type: int  default: 1
  --interrupt_budget (execution budget before interrupt is triggered)
        type: int  default: 6144
  --type_info_threshold (percentage of ICs that must have type info to allow optimization)
        type: int  default: 25
  --generic_ic_threshold (max percentage of megamorphic/generic ICs to allow optimization)
        type: int  default: 30
  --self_opt_count (call count before self-optimization)
        type: int  default: 130
  --trace_opt_verbose (extra verbose compilation tracing)
        type: bool  default: false
  --min_semi_space_size (min size of a semi-space (in MBytes), the new space consists of twosemi-spaces)
        type: int  default: 0
  --max_semi_space_size (max size of a semi-space (in MBytes), the new space consists of twosemi-spaces)
        type: int  default: 0
  --semi_space_growth_factor (factor by which to grow the new space)
        type: int  default: 2
  --experimental_new_space_growth_heuristic (Grow the new space based on the percentage of survivors instead of their absolute value.)
        type: bool  default: false
  --max_old_space_size (max size of the old space (in Mbytes))
        type: int  default: 0
  --initial_old_space_size (initial old space size (in Mbytes))
        type: int  default: 0
  --gc_global (always perform global GCs)
        type: bool  default: false
  --gc_interval (garbage collect after <n> allocations)
        type: int  default: -1
  --retain_maps_for_n_gc (keeps maps alive for <n> old space garbage collections)
        type: int  default: 2
  --trace_gc (print one trace line following each garbage collection)
        type: bool  default: false
  --trace_gc_nvp (print one detailed trace line in name=value format after each garbage collection)
        type: bool  default: false
  --trace_gc_ignore_scavenger (do not print trace line after scavenger collection)
        type: bool  default: false
  --trace_idle_notification (print one trace line following each idle notification)
        type: bool  default: false
  --trace_idle_notification_verbose (prints the heap state used by the idle notification)
        type: bool  default: false
  --trace_gc_verbose (print more details following each garbage collection)
        type: bool  default: false
  --trace_allocation_stack_interval (print stack trace after <n> free-list allocations)
        type: int  default: -1
  --trace_fragmentation (report fragmentation for old space)
        type: bool  default: false
  --trace_fragmentation_verbose (report fragmentation for old space (detailed))
        type: bool  default: false
  --trace_evacuation (report evacuation statistics)
        type: bool  default: false
  --trace_mutator_utilization (print mutator utilization, allocation speed, gc speed)
        type: bool  default: false
  --flush_code (flush code that we expect not to use again)
        type: bool  default: true
  --trace_code_flushing (trace code flushing progress)
        type: bool  default: false
  --age_code (track un-executed functions to age code and flush only old code (required for code flushing))
        type: bool  default: true
  --incremental_marking (use incremental marking)
        type: bool  default: true
  --incremental_marking_wrappers (use incremental marking for marking wrappers)
        type: bool  default: true
  --min_progress_during_incremental_marking_finalization (keep finalizing incremental marking as long as we discover at least this many unmarked objects)
        type: int  default: 32
  --max_incremental_marking_finalization_rounds (at most try this many times to finalize incremental marking)
        type: int  default: 3
  --minor_mc (perform young generation mark compact GCs)
        type: bool  default: false
  --black_allocation (use black allocation)
        type: bool  default: true
  --concurrent_sweeping (use concurrent sweeping)
        type: bool  default: true
  --parallel_compaction (use parallel compaction)
        type: bool  default: true
  --parallel_pointer_update (use parallel pointer update during compaction)
        type: bool  default: true
  --trace_incremental_marking (trace progress of the incremental marking)
        type: bool  default: false
  --track_gc_object_stats (track object counts and memory usage)
        type: bool  default: false
  --trace_gc_object_stats (trace object counts and memory usage)
        type: bool  default: false
  --gc_stats (Used by tracing internally to enable gc statistics)
        type: int  default: 0
  --track_detached_contexts (track native contexts that are expected to be garbage collected)
        type: bool  default: true
  --trace_detached_contexts (trace native contexts that are expected to be garbage collected)
        type: bool  default: false
  --move_object_start (enable moving of object starts)
        type: bool  default: true
  --memory_reducer (use memory reducer)
        type: bool  default: true
  --heap_growing_percent (specifies heap growing factor as (1 + heap_growing_percent/100))
        type: int  default: 0
  --v8_os_page_size (override OS page size (in KBytes))
        type: int  default: 0
  --always_compact (Perform compaction on every full GC)
        type: bool  default: false
  --never_compact (Never perform compaction on full GC - testing only)
        type: bool  default: false
  --compact_code_space (Compact code space on full collections)
        type: bool  default: true
  --cleanup_code_caches_at_gc (Flush code caches in maps during mark compact cycle.)
        type: bool  default: true
  --use_marking_progress_bar (Use a progress bar to scan large objects in increments when incremental marking is active.)
        type: bool  default: true
  --zap_code_space (Zap free memory in code space with 0xCC while sweeping.)
        type: bool  default: false
  --force_marking_deque_overflows (force overflows of marking deque by reducing it's size to 64 words)
        type: bool  default: false
  --stress_compaction (stress the GC compactor to flush out bugs (implies --force_marking_deque_overflows))
        type: bool  default: false
  --manual_evacuation_candidates_selection (Test mode only flag. It allows an unit test to select evacuation candidates pages (requires --stress_compaction).)
        type: bool  default: false
  --fast_promotion_new_space (fast promote new space on high survival rates)
        type: bool  default: false
  --debug_code (generate extra code (assertions) for debugging)
        type: bool  default: false
  --code_comments (emit comments in code disassembly)
        type: bool  default: false
  --enable_sse3 (enable use of SSE3 instructions if available)
        type: bool  default: true
  --enable_ssse3 (enable use of SSSE3 instructions if available)
        type: bool  default: true
  --enable_sse4_1 (enable use of SSE4.1 instructions if available)
        type: bool  default: true
  --enable_sahf (enable use of SAHF instruction if available (X64 only))
        type: bool  default: true
  --enable_avx (enable use of AVX instructions if available)
        type: bool  default: true
  --enable_fma3 (enable use of FMA3 instructions if available)
        type: bool  default: true
  --enable_bmi1 (enable use of BMI1 instructions if available)
        type: bool  default: true
  --enable_bmi2 (enable use of BMI2 instructions if available)
        type: bool  default: true
  --enable_lzcnt (enable use of LZCNT instruction if available)
        type: bool  default: true
  --enable_popcnt (enable use of POPCNT instruction if available)
        type: bool  default: true
  --arm_arch (generate instructions for the selected ARM architecture if available: armv6, armv7, armv7+sudiv or armv8)
        type: string  default: armv8
  --enable_vldr_imm (enable use of constant pools for double immediate (ARM only))
        type: bool  default: false
  --force_long_branches (force all emitted branches to be in long mode (MIPS/PPC only))
        type: bool  default: false
  --mcpu (enable optimization for specific cpu)
        type: string  default: auto
  --enable_armv7 (deprecated (use --arm_arch instead))
        type: maybe_bool  default: unset
  --enable_vfp3 (deprecated (use --arm_arch instead))
        type: maybe_bool  default: unset
  --enable_32dregs (deprecated (use --arm_arch instead))
        type: maybe_bool  default: unset
  --enable_neon (deprecated (use --arm_arch instead))
        type: maybe_bool  default: unset
  --enable_sudiv (deprecated (use --arm_arch instead))
        type: maybe_bool  default: unset
  --enable_armv8 (deprecated (use --arm_arch instead))
        type: maybe_bool  default: unset
  --enable_regexp_unaligned_accesses (enable unaligned accesses for the regexp engine)
        type: bool  default: true
  --script_streaming (enable parsing on background)
        type: bool  default: true
  --disable_old_api_accessors (Disable old-style API accessors whose setters trigger through the prototype chain)
        type: bool  default: false
  --expose_natives_as (expose natives in global object)
        type: string  default: NULL
  --expose_free_buffer (expose freeBuffer extension)
        type: bool  default: false
  --expose_gc (expose gc extension)
        type: bool  default: false
  --expose_gc_as (expose gc extension under the specified name)
        type: string  default: NULL
  --expose_externalize_string (expose externalize string extension)
        type: bool  default: false
  --expose_trigger_failure (expose trigger-failure extension)
        type: bool  default: false
  --stack_trace_limit (number of stack frames to capture)
        type: int  default: 10
  --builtins_in_stack_traces (show built-in functions in stack traces)
        type: bool  default: false
  --enable_fast_array_builtins (use optimized builtins)
        type: bool  default: false
  --allow_unsafe_function_constructor (allow invoking the function constructor without security checks)
        type: bool  default: false
  --inline_new (use fast inline allocation)
        type: bool  default: true
  --trace_codegen (print name of functions for which code is generated)
        type: bool  default: false
  --trace (trace function calls)
        type: bool  default: false
  --mask_constants_with_cookie (use random jit cookie to mask large constants)
        type: bool  default: true
  --lazy (use lazy compilation)
        type: bool  default: true
  --trace_opt (trace lazy optimization)
        type: bool  default: false
  --trace_opt_stats (trace lazy optimization statistics)
        type: bool  default: false
  --trace_file_names (include file names in trace-opt/trace-deopt output)
        type: bool  default: false
  --opt (use adaptive optimizations)
        type: bool  default: true
  --always_opt (always try to optimize functions)
        type: bool  default: false
  --always_osr (always try to OSR functions)
        type: bool  default: false
  --prepare_always_opt (prepare for turning on always opt)
        type: bool  default: false
  --trace_deopt (trace optimize function deoptimization)
        type: bool  default: false
  --trace_stub_failures (trace deoptimization of generated code stubs)
        type: bool  default: false
  --serialize_toplevel (enable caching of toplevel scripts)
        type: bool  default: true
  --serialize_eager (compile eagerly when caching scripts)
        type: bool  default: false
  --serialize_age_code (pre age code in the code cache)
        type: bool  default: false
  --trace_serializer (print code serializer trace)
        type: bool  default: false
  --max_opt_count (maximum number of optimization attempts before giving up.)
        type: int  default: 10
  --compilation_cache (enable compilation cache)
        type: bool  default: true
  --cache_prototype_transitions (cache prototype transitions)
        type: bool  default: true
  --compiler_dispatcher (enable compiler dispatcher)
        type: bool  default: false
  --compiler_dispatcher_eager_inner (enable background compilation of eager inner functions)
        type: bool  default: false
  --trace_compiler_dispatcher (trace compiler dispatcher activity)
        type: bool  default: false
  --trace_compiler_dispatcher_jobs (trace progress of individual jobs managed by the compiler dispatcher)
        type: bool  default: false
  --cpu_profiler_sampling_interval (CPU profiler sampling interval in microseconds)
        type: int  default: 1000
  --trace_js_array_abuse (trace out-of-bounds accesses to JS arrays)
        type: bool  default: false
  --trace_external_array_abuse (trace out-of-bounds-accesses to external arrays)
        type: bool  default: false
  --trace_array_abuse (trace out-of-bounds accesses to all arrays)
        type: bool  default: false
  --trace_debug_json (trace debugging JSON request/response)
        type: bool  default: false
  --enable_liveedit (enable liveedit experimental feature)
        type: bool  default: true
  --trace_side_effect_free_debug_evaluate (print debug messages for side-effect-free debug-evaluate for testing)
        type: bool  default: false
  --hard_abort (abort by crashing)
        type: bool  default: true
  --stack_size (default size of stack region v8 is allowed to use (in kBytes))
        type: int  default: 984
  --max_stack_trace_source_length (maximum length of function source code printed in a stack trace.)
        type: int  default: 300
  --always_inline_smi_code (always inline smi code in non-opt code)
        type: bool  default: false
  --verify_operand_stack_depth (emit debug code that verifies the static tracking of the operand stack depth)
        type: bool  default: false
  --clear_exceptions_on_js_entry (clear pending exceptions when entering JavaScript)
        type: bool  default: false
  --histogram_interval (time interval in ms for aggregating memory histograms)
        type: int  default: 600000
  --trace_object_groups (print object groups detected during each garbage collection)
        type: bool  default: false
  --heap_profiler_trace_objects (Dump heap object allocations/movements/size_updates)
        type: bool  default: false
  --sampling_heap_profiler_suppress_randomness (Use constant sample intervals to eliminate test flakiness)
        type: bool  default: false
  --use_idle_notification (Use idle notification to reduce memory footprint.)
        type: bool  default: true
  --use_ic (use inline caching)
        type: bool  default: true
  --trace_ic (trace inline cache state transitions)
        type: bool  default: false
  --ic_stats (inline cache state transitions statistics)
        type: int  default: 0
  --native_code_counters (generate extra code for manipulating stats counters)
        type: bool  default: false
  --thin_strings (Enable ThinString support)
        type: bool  default: false
  --trace_weak_arrays (Trace WeakFixedArray usage)
        type: bool  default: false
  --trace_prototype_users (Trace updates to prototype user tracking)
        type: bool  default: false
  --use_verbose_printer (allows verbose printing)
        type: bool  default: true
  --trace_for_in_enumerate (Trace for-in enumerate slow-paths)
        type: bool  default: false
  --allow_natives_syntax (allow natives syntax)
        type: bool  default: false
  --trace_parse (trace parsing and preparsing)
        type: bool  default: false
  --trace_preparse (trace preparsing decisions)
        type: bool  default: false
  --lazy_inner_functions (enable lazy parsing inner functions)
        type: bool  default: true
  --aggressive_lazy_inner_functions (even lazier inner function parsing)
        type: bool  default: false
  --preparser_scope_analysis (perform scope analysis for preparsed inner functions)
        type: bool  default: false
  --trace_sim (Trace simulator execution)
        type: bool  default: false
  --debug_sim (Enable debugging the simulator)
        type: bool  default: false
  --check_icache (Check icache flushes in ARM and MIPS simulator)
        type: bool  default: false
  --stop_sim_at (Simulator stop after x number of instructions)
        type: int  default: 0
  --sim_stack_alignment (Stack alingment in bytes in simulator (4 or 8, 8 is default))
        type: int  default: 8
  --sim_stack_size (Stack size of the ARM64, MIPS64 and PPC64 simulator in kBytes (default is 2 MB))
        type: int  default: 2048
  --log_regs_modified (When logging register values, only print modified registers.)
        type: bool  default: true
  --log_colour (When logging, try to use coloured output.)
        type: bool  default: true
  --ignore_asm_unimplemented_break (Don't break for ASM_UNIMPLEMENTED_BREAK macros.)
        type: bool  default: false
  --trace_sim_messages (Trace simulator debug messages. Implied by --trace-sim.)
        type: bool  default: false
  --stack_trace_on_illegal (print stack trace when an illegal exception is thrown)
        type: bool  default: false
  --abort_on_uncaught_exception (abort program (dump core) when an uncaught exception is thrown)
        type: bool  default: false
  --abort_on_stack_overflow (Abort program when stack overflow (as opposed to throwing RangeError). This is useful for fuzzing where the spec behaviour would introduce nondeterminism.)
        type: bool  default: false
  --randomize_hashes (randomize hashes to avoid predictable hash collisions (with snapshots this option cannot override the baked-in seed))
        type: bool  default: true
  --hash_seed (Fixed seed to use to hash property keys (0 means random)(with snapshots this option cannot override the baked-in seed))
        type: int  default: 0
  --random_seed (Default seed for initializing random generator (0, the default, means to use system random).)
        type: int  default: 0
  --trace_rail (trace RAIL mode)
        type: bool  default: false
  --print_all_exceptions (print exception object and stack trace on each thrown exception)
        type: bool  default: false
  --runtime_call_stats (report runtime call counts and times)
        type: bool  default: false
  --runtime_stats (internal usage only for controlling runtime statistics)
        type: int  default: 0
  --profile_deserialization (Print the time it takes to deserialize the snapshot.)
        type: bool  default: false
  --serialization_statistics (Collect statistics on serialized objects.)
        type: bool  default: false
  --regexp_optimization (generate optimized regexp code)
        type: bool  default: true
  --testing_bool_flag (testing_bool_flag)
        type: bool  default: true
  --testing_maybe_bool_flag (testing_maybe_bool_flag)
        type: maybe_bool  default: unset
  --testing_int_flag (testing_int_flag)
        type: int  default: 13
  --testing_float_flag (float-flag)
        type: float  default: 2.5
  --testing_string_flag (string-flag)
        type: string  default: Hello, world!
  --testing_prng_seed (Seed used for threading test randomness)
        type: int  default: 42
  --startup_src (Write V8 startup as C++ src. (mksnapshot only))
        type: string  default: NULL
  --startup_blob (Write V8 startup blob file. (mksnapshot only))
        type: string  default: NULL
  --profile_hydrogen_code_stub_compilation (Print the time it takes to lazily compile hydrogen code stubs.)
        type: bool  default: false
  --help (Print usage message, including flags, on console)
        type: bool  default: true
  --dump_counters (Dump counters on exit)
        type: bool  default: false
  --dump_counters_nvp (Dump counters as name-value pairs on exit)
        type: bool  default: false
  --map_counters (Map counters to a file)
        type: string  default: 
  --js_arguments (Pass all remaining arguments to the script. Alias for "--".)
        type: arguments  default: 
  --log (Minimal logging (no API, code, GC, suspect, or handles samples).)
        type: bool  default: false
  --log_all (Log all events to the log file.)
        type: bool  default: false
  --log_api (Log API events to the log file.)
        type: bool  default: false
  --log_code (Log code events to the log file without profiling.)
        type: bool  default: false
  --log_gc (Log heap samples on garbage collection for the hp2ps tool.)
        type: bool  default: false
  --log_handles (Log global handle events.)
        type: bool  default: false
  --log_suspect (Log suspect operations.)
        type: bool  default: false
  --prof (Log statistical profiling information (implies --log-code).)
        type: bool  default: false
  --prof_cpp (Like --prof, but ignore generated code.)
        type: bool  default: false
  --prof_browser_mode (Used with --prof, turns on browser-compatible mode for profiling.)
        type: bool  default: true
  --logfile (Specify the name of the log file.)
        type: string  default: v8.log
  --logfile_per_isolate (Separate log files for each isolate.)
        type: bool  default: true
  --ll_prof (Enable low-level linux profiler.)
        type: bool  default: false
  --perf_basic_prof (Enable perf linux profiler (basic support).)
        type: bool  default: false
  --perf_basic_prof_only_functions (Only report function code ranges to perf (i.e. no stubs).)
        type: bool  default: false
  --perf_prof (Enable perf linux profiler (experimental annotate support).)
        type: bool  default: false
  --perf_prof_unwinding_info (Enable unwinding info for perf linux profiler (experimental).)
        type: bool  default: false
  --gc_fake_mmap (Specify the name of the file for fake gc mmap used in ll_prof)
        type: string  default: /tmp/__v8_gc__
  --log_internal_timer_events (Time internal events.)
        type: bool  default: false
  --log_timer_events (Time events including external callbacks.)
        type: bool  default: false
  --log_instruction_stats (Log AArch64 instruction statistics.)
        type: bool  default: false
  --log_instruction_file (AArch64 instruction statistics log file.)
        type: string  default: arm64_inst.csv
  --log_instruction_period (AArch64 instruction statistics logging period.)
        type: int  default: 4194304
  --redirect_code_traces (output deopt information and disassembly into file code-<pid>-<isolate id>.asm)
        type: bool  default: false
  --redirect_code_traces_to (output deopt information and disassembly into the given file)
        type: string  default: NULL
  --hydrogen_track_positions (track source code positions when building IR)
        type: bool  default: false
  --print_opt_source (print source code of optimized and inlined functions)
        type: bool  default: false
  --trace_elements_transitions (trace elements transitions)
        type: bool  default: false
  --trace_creation_allocation_sites (trace the creation of allocation sites)
        type: bool  default: false
  --print_code_stubs (print code stubs)
        type: bool  default: false
  --test_secondary_stub_cache (test secondary stub cache by disabling the primary one)
        type: bool  default: false
  --test_primary_stub_cache (test primary stub cache by disabling the secondary one)
        type: bool  default: false
  --test_small_max_function_context_stub_size (enable testing the function context size overflow path by making the maximum size smaller)
        type: bool  default: false
  --print_code (print generated code)
        type: bool  default: false
  --print_opt_code (print optimized code)
        type: bool  default: false
  --print_opt_code_filter (filter for printing optimized code)
        type: string  default: *
  --print_unopt_code (print unoptimized code before printing optimized code based on it)
        type: bool  default: false
  --print_code_verbose (print more information for code)
        type: bool  default: false
  --print_builtin_code (print generated code for builtins)
        type: bool  default: false
  --sodium (print generated code output suitable for use with the Sodium code viewer)
        type: bool  default: false
  --print_all_code (enable all flags related to printing code)
        type: bool  default: false
  --predictable (enable predictable mode)
        type: bool  default: false
  --single_threaded (disable the use of background tasks)
        type: bool  default: false