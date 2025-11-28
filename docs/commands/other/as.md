---
title: as - Portable GNU Assembler
sidebar_label: as
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# as - Portable GNU Assembler

The `as` command is the GNU Assembler, a portable and powerful assembler that converts assembly language source code into machine-readable object files. It supports multiple processor architectures including x86, ARM, MIPS, PowerPC, and RISC-V. The GNU Assembler is part of the GNU Binary Utilities (binutils) and works seamlessly with other GNU development tools like GCC and GDB. It features a rich macro language, conditional assembly, and extensive debugging information generation capabilities, making it ideal for system programming, embedded development, and performance-critical applications.

## Basic Syntax

```bash
as [OPTIONS] [INPUT_FILE] [-o OUTPUT_FILE]
```

## Key Processor Architectures

- `x86_64` - 64-bit x86 processors
- `i386` - 32-bit x86 processors
- `arm` - ARM processors
- `aarch64` - 64-bit ARM processors
- `mips` - MIPS architecture
- `ppc` - PowerPC architecture
- `riscv` - RISC-V architecture

## Common Options

### Output Control
- `-o FILE` - Specify output object file name
- `-a` - List source and assembly (similar to `-adhln`)
- `-R` - Merge data into text section
- `--statistics` - Print assembly statistics

### Debugging Information
- `-g` - Generate debugging information
- `-gstabs` - Generate STABS debugging format
- `-gdwarf2` - Generate DWARF2 debugging format
- `-gdwarf-5` - Generate DWARF5 debugging format
- `--compress-debug-sections` - Compress debug sections

### Optimization and Performance
- `--reduce-memory-overheads` - Reduce memory usage
- `--hash-size=SIZE` - Set symbol hash table size
- `--multibyte` - Handle multibyte characters

### Listing Control
- `-al` - Include assembly code in listing
- `-ad` - Include debugging directives
- `-ah` - Include high-level source
- `-an` - Suppress forms processing
- `-as` - Include symbols

### Warning and Error Control
- `-W` - Suppress warnings
- `--fatal-warnings` - Treat warnings as errors
- `--warn` - Enable warning messages
- `-Z` - Generate object file even with errors

### Target Selection
- `--32` - Generate 32-bit code
- `--64` - Generate 64-bit code
- `-march=CPU` - Specify target processor
- `-mtune=CPU` - Optimize for specific processor

### Macro Processing
- `-I DIR` - Add directory to include search path
- `--strip-local-absolute` - Remove local absolute symbols
- `--no-pad-sections` - Don't pad sections

## Usage Examples

### Basic Assembly Operations

#### Simple Assembly
```bash
# Assemble basic assembly file
as program.s -o program.o

# Assemble with debug information
as -g program.s -o program.o

# Assemble with listing file
as -alh program.s -o program.o > program.lst
```

#### Cross-architecture Assembly
```bash
# Assemble for ARM
as -march=armv7-a program.s -o program.o

# Assemble for RISC-V
as -march=rv64imac program.s -o program.o

# Assemble 32-bit code on 64-bit system
as --32 program.s -o program32.o
```

### Advanced Assembly Features

#### Macro Processing
```bash
# Assemble with include directories
as -I./include -I./macros program.s -o program.o

# Assemble with macro expansion listing
as -am program.s -o program.o > macro_listing.txt

# Process complex assembly with multiple includes
as -I./inc -I./arch/x86 -al program.s -o program.o > full_listing.txt
```

#### Debug Information Generation
```bash
# Generate DWARF5 debug info
as -gdwarf-5 program.s -o program.o

# Generate STABS debug info for older systems
as -gstabs program.s -o program.o

# Generate compressed debug sections
as -g --compress-debug-sections program.s -o program.o
```

## Assembly Programming Examples

### Basic x86 Assembly
```bash
# Create hello.s
cat > hello.s << 'EOF'
.section .data
    msg: .ascii "Hello, World!\n"
    len = . - msg

.section .text
    .global _start

_start:
    # Write system call
    mov $1, %rax        # sys_write
    mov $1, %rdi        # stdout
    mov $msg, %rsi      # message address
    mov $len, %rdx      # message length
    syscall

    # Exit system call
    mov $60, %rax       # sys_exit
    mov $0, %rdi        # exit code
    syscall
EOF

# Assemble and link
as -g hello.s -o hello.o
ld hello.o -o hello
./hello
```

### ARM Assembly Example
```bash
# Create arm_hello.s
cat > arm_hello.s << 'EOF'
.data
msg: .asciz "Hello ARM!\n"
len = . - msg - 1

.text
.global _start

_start:
    mov r7, #4          @ sys_write
    mov r0, #1          @ stdout
    ldr r1, =msg        @ message address
    ldr r2, =len        @ message length
    svc 0               @ system call

    mov r7, #1          @ sys_exit
    mov r0, #0          @ exit code
    svc 0               @ system call
EOF

# Assemble for ARM
as -march=armv7-a arm_hello.s -o arm_hello.o
ld arm_hello.o -o arm_hello
```

### Functions and Calling Conventions
```bash
# Create functions.s
cat > functions.s << 'EOF'
.text
.global _start

# Function: add_numbers
# Input: %rdi, %rsi (two integers)
# Output: %rax (sum)
.type add_numbers, @function
add_numbers:
    mov %rdi, %rax
    add %rsi, %rax
    ret

_start:
    # Call add_numbers with 10 and 20
    mov $10, %rdi
    mov $20, %rsi
    call add_numbers

    # Exit with result
    mov %rax, %rdi      # use sum as exit code
    mov $60, %rax       # sys_exit
    syscall
EOF

# Assemble with debug info
as -gdwarf-5 functions.s -o functions.o
ld functions.o -o functions
./functions
echo $?  # Should output 30
```

### Macros and Conditional Assembly
```bash
# Create macros.s
cat > macros.s << 'EOF'
.macro print_string str
    .section .rodata
    .L_msg_\@: .asciz "\str"
    .text
    push %rax
    push %rdi
    push %rsi
    push %rdx
    mov $1, %rax        @ sys_write
    mov $1, %rdi        @ stdout
    mov $.L_msg_\@, %rsi
    mov $(.L_msg_\@_end - .L_msg_\@ - 1), %rdx
    syscall
    pop %rdx
    pop %rsi
    pop %rdi
    pop %rax
.L_msg_\@_end:
.endm

.text
.global _start

_start:
    print_string "Hello from macro!"
    print_string "This is assembly programming"

    mov $60, %rax       @ sys_exit
    mov $0, %rdi        @ exit code
    syscall
EOF

# Assemble with macro expansion
as -am macros.s -o macros.o > macros.lst
ld macros.o -o macros
./macros
```

## Practical Applications

### System Programming

#### System Call Wrapper
```bash
# Create syscall_wrapper.s
cat > syscall_wrapper.s << 'EOF'
.text
.global write_syscall, exit_syscall

# int write_syscall(int fd, const void *buf, size_t count)
.type write_syscall, @function
write_syscall:
    mov %rdi, %rax      @ sys_write number (1)
    mov %rdi, %rdi      @ fd
    mov %rsi, %rsi      @ buf
    mov %rdx, %rdx      @ count
    syscall
    ret

# void exit_syscall(int status)
.type exit_syscall, @function
exit_syscall:
    mov $60, %rax       @ sys_exit
    mov %rdi, %rdi      @ status
    syscall
    ret
EOF

# Assemble as object library
as -g syscall_wrapper.s -o syscall_wrapper.o
```

#### Interrupt Handler (x86)
```bash
# Create interrupt_handler.s
cat > interrupt_handler.s << 'EOF'
.data
int_msg: .ascii "Interrupt handled!\n"
int_len = . - int_msg

.text
.global interrupt_handler

.interrupt_handler:
    pusha               @ Save all registers
    cld                 @ Clear direction flag

    # Print message
    mov $1, %eax        @ sys_write
    mov $1, %edi        @ stdout
    mov $int_msg, %esi  @ message
    mov $int_len, %edx  @ length
    int $0x80           @ System call (for 32-bit)

    popa                @ Restore all registers
    iret                @ Return from interrupt
EOF

# Assemble with debug information
as -gdwarf-5 interrupt_handler.s -o interrupt_handler.o
```

### Performance Optimization

#### Optimized Math Operations
```bash
# Create optimized_math.s
cat > optimized_math.s << 'EOF'
.text
.global fast_multiply, fast_divide

# Fast multiplication using bit shifts
# int fast_multiply(int a, int b)
fast_multiply:
    # Uses Russian peasant multiplication algorithm
    mov %rdi, %rax      @ a in rax
    mov %rsi, %rcx      @ b in rcx
    xor %rdx, %rdx      @ result in rdx

.multiply_loop:
    test %rcx, %rcx
    jz .multiply_done
    test $1, %rcx
    jz .skip_add
    add %rax, %rdx

.skip_add:
    shl $1, %rax        @ a = a * 2
    shr $1, %rcx        @ b = b / 2
    jmp .multiply_loop

.multiply_done:
    mov %rdx, %rax      @ return result
    ret

# Fast division using bit shifts (power of 2 divisor)
# int fast_divide(int dividend, int divisor)
fast_divide:
    mov %rdi, %rax      @ dividend
    mov %rsi, %rcx      @ divisor
    xor %rdx, %rdx      @ result

.divide_loop:
    cmp %rax, %rcx
    jl .divide_done
    sub %rcx, %rax
    inc %rdx
    jmp .divide_loop

.divide_done:
    mov %rdx, %rax      @ return result
    ret
EOF

# Assemble with optimization hints
as --64 optimized_math.s -o optimized_math.o
```

#### SIMD Operations (x86 SSE)
```bash
# Create simd_operations.s
cat > simd_operations.s << 'EOF'
.text
.global vector_add

# void vector_add(float *a, float *b, float *result, int count)
vector_add:
    push %rbp
    mov %rsp, %rbp
    mov %rdi, %rax      @ a
    mov %rsi, %rcx      @ b
    mov %rdx, %r8       @ result
    mov %rcx, %rdx      @ count

    # Align to 16-byte boundary
    test $15, %rax
    jz .vector_loop

.scalar_loop:
    movss (%rax), %xmm0
    addss (%rcx), %xmm0
    movss %xmm0, (%r8)
    add $4, %rax
    add $4, %rcx
    add $4, %r8
    dec %edx
    jnz .scalar_loop
    jmp .done

.vector_loop:
    cmp $4, %edx
    jl .scalar_remaining

    movaps (%rax), %xmm0     @ Load 4 floats from a
    addps (%rcx), %xmm0      @ Add 4 floats from b
    movaps %xmm0, (%r8)      @ Store result
    add $16, %rax
    add $16, %rcx
    add $16, %r8
    sub $4, %edx
    jnz .vector_loop

.scalar_remaining:
    test %edx, %edx
    jz .done
    movss (%rax), %xmm0
    addss (%rcx), %xmm0
    movss %xmm0, (%r8)
    add $4, %rax
    add $4, %rcx
    add $4, %r8
    dec %edx
    jnz .scalar_remaining

.done:
    mov %rbp, %rsp
    pop %rbp
    ret
EOF

# Assemble with SIMD support
as -march=x86-64 -msse4 simd_operations.s -o simd_operations.o
```

### Embedded Systems

#### ARM Cortex-M Startup Code
```bash
# Create startup_cm3.s
cat > startup_cm3.s << 'EOF'
.syntax unified
.cpu cortex-m3
.fpu softvfp
.thumb

.global Reset_Handler
.global Default_Handler
.global g_pfnVectors

/* Vector table */
.section .isr_vector,"a",%progbits
.type g_pfnVectors, %object
.size g_pfnVectors, .-g_pfnVectors

g_pfnVectors:
    .word _estack         @ Top of Stack
    .word Reset_Handler   @ Reset Handler
    .word NMI_Handler     @ NMI Handler
    .word HardFault_Handler
    .word 0               @ Reserved
    .word 0               @ Reserved
    .word 0               @ Reserved
    .word 0               @ Reserved
    .word 0               @ Reserved
    .word 0               @ Reserved
    .word 0               @ Reserved
    .word SVC_Handler     @ SVCall Handler
    .word 0               @ Reserved
    .word 0               @ Reserved
    .word PendSV_Handler  @ PendSV Handler
    .word SysTick_Handler @ SysTick Handler

/* External Interrupts */
    .word 0               @ GPIOA
    .word 0               @ GPIOB
    .word 0               @ GPIOC
    /* ... more interrupt handlers ... */

/* Reset Handler */
 Reset_Handler:
    ldr r0, =_sidata
    ldr r1, =_sdata
    ldr r2, =_edata

    movs r3, #0
    b LoopCopyDataInit

CopyDataInit:
    ldr r4, [r0, r3]
    str r4, [r1, r3]
    adds r3, r3, #4

LoopCopyDataInit:
    adds r4, r1, r3
    cmp r4, r2
    bcc CopyDataInit

    ldr r0, =_sbss
    ldr r1, =_ebss
    movs r3, #0
    str r3, [r0], #4
    str r3, [r0], #4
    str r3, [r0], #4
    str r3, [r0], #4
    str r3, [r0], #4
    str r3, [r0], #4
    str r3, [r0], #4
    str r3, [r0], #4

    /* Call system initialization */
    bl SystemInit
    /* Call static constructors */
    bl __libc_init_array
    /* Call main application */
    bl main

LoopForever:
    b LoopForever

.size Reset_Handler, .-Reset_Handler

/* Default Handler */
Default_Handler:
Infinite_Loop:
    b Infinite_Loop
.size Default_Handler, .-Default_Handler

/* Weak definitions */
.weak NMI_Handler
.thumb_set NMI_Handler,Default_Handler

.weak HardFault_Handler
.thumb_set HardFault_Handler,Default_Handler

.weak SVC_Handler
.thumb_set SVC_Handler,Default_Handler

.weak PendSV_Handler
.thumb_set PendSV_Handler,Default_Handler

.weak SysTick_Handler
.thumb_set SysTick_Handler,Default_Handler
EOF

# Assemble for ARM Cortex-M3
as -mcpu=cortex-m3 -mthumb startup_cm3.s -o startup_cm3.o
```

## Integration with Build Systems

### Makefile Integration
```bash
# Create Makefile for assembly projects
cat > Makefile << 'EOF'
CC = gcc
AS = as
LD = ld
ASFLAGS = -g -gdwarf-5
CFLAGS = -g -O2
LDFLAGS =

.SUFFIXES: .s .o .c

# Assembly source files
ASM_SRCS = main.s utils.s
C_SRCS = helper.c
OBJS = $(ASM_SRCS:.s=.o) $(C_SRCS:.c=.o)
TARGET = program

.PHONY: all clean

all: $(TARGET)

$(TARGET): $(OBJS)
	$(LD) $(LDFLAGS) -o $@ $^

%.o: %.s
	$(AS) $(ASFLAGS) -o $@ $<

%.o: %.c
	$(CC) $(CFLAGS) -c -o $@ $<

clean:
	rm -f $(OBJS) $(TARGET)
EOF

# Build the project
make
```

### GCC Integration
```bash
# Create mixed C and Assembly program
cat > main.c << 'EOF'
#include <stdio.h>

extern int asm_add(int a, int b);
extern void asm_print(const char *msg);

int main() {
    int result = asm_add(10, 20);
    printf("C: Result from assembly: %d\n", result);

    asm_print("Hello from C calling assembly!");

    return 0;
}
EOF

cat > asm_funcs.s << 'EOF'
.text
.global asm_add, asm_print

asm_add:
    mov %edi, %eax      @ first argument
    add %esi, %eax      @ add second argument
    ret                 @ return in eax

asm_print:
    push %rax
    push %rdi
    push %rsi
    push %rdx

    mov $1, %rax        @ sys_write
    mov $1, %rdi        @ stdout
    mov %rdi, %rsi      @ message (already in rdi)
    mov $0, %rdx        @ length (we'll find it)

.find_len:
    cmpb $0, (%rsi,%rdx,1)
    je .found
    inc %rdx
    jmp .find_len

.found:
    syscall

    pop %rdx
    pop %rsi
    pop %rdi
    pop %rax
    ret
EOF

# Compile and link with GCC
gcc -g -c main.c -o main.o
as -g asm_funcs.s -o asm_funcs.o
gcc main.o asm_funcs.o -o mixed_program
./mixed_program
```

## Advanced Assembly Features

### Position Independent Code (PIC)
```bash
# Create pic_example.s
cat > pic_example.s << 'EOF'
.text
.global pic_function
.type pic_function, @function

pic_function:
    .cfi_startproc

    # Get address of global data table
    call .Lget_pc
.Lget_pc:
    pop %rax            @ Get PC
    add $.Ldata_table-.Lget_pc, %rax @ Adjust to data table

    # Access data through PC-relative addressing
    mov (%rax), %rdi    @ Load first data item
    mov 8(%rax), %rsi   @ Load second data item

    # Perform operation
    add %rsi, %rdi

    # Return result
    mov %rdi, %rax
    ret

    .cfi_endproc

.section .rodata
.Ldata_table:
    .quad 42            @ First data item
    .quad 58            @ Second data item
    .string "PIC Example"
EOF

# Assemble as position independent code
as -fPIC pic_example.s -o pic_example.o
```

### Conditional Assembly
```bash
# Create conditional.s
cat > conditional.s << 'EOF'
#define DEBUG 1
#define ARCH_X86_64 1

.text
.global conditional_function

conditional_function:
#ifdef DEBUG
    // Debug code - print function entry
    push %rax
    push %rdi
    push %rsi
    push %rdx
    mov $1, %rax        @ sys_write
    mov $1, %rdi        @ stdout
    mov $.Ldebug_msg, %rsi
    mov $.Ldebug_msg_end - .Ldebug_msg, %rdx
    syscall
    pop %rdx
    pop %rsi
    pop %rdi
    pop %rax
#endif

#ifdef ARCH_X86_64
    // x86-64 specific implementation
    mov %rdi, %rax
    add %rsi, %rax
#else
    // Generic implementation
    mov %edi, %eax
    add %esi, %eax
#endif
    ret

.section .rodata
.Ldebug_msg: .ascii "Function called\n"
.Ldebug_msg_end:
EOF

# Assemble with preprocessor
as -g conditional.s -o conditional.o
```

## Debugging and Analysis

### Assembly Debugging with GDB
```bash
# Create debug_example.s
cat > debug_example.s << 'EOF'
.text
.global _start

_start:
    mov $42, %rax        @ Set initial value
    mov $24, %rbx        @ Second value
    add %rbx, %rax       @ Add them

    # Breakpoint location
    nop                   @ Insert NOP for easy breakpoint

    mov %rax, %rdi       @ Prepare for exit
    mov $60, %rax        @ sys_exit
    syscall
EOF

# Assemble with debug information
as -gdwarf-3 debug_example.s -o debug_example.o
ld debug_example.o -o debug_example

# Debug with GDB
gdb ./debug_example << 'EOF'
break *main+4
run
info registers
step
info registers
continue
quit
EOF
```

### Assembly Analysis
```bash
# Create analysis_example.s
cat > analysis_example.s << 'EOF'
.text
.global complex_function

complex_function:
    push %rbp
    mov %rsp, %rbp
    sub $16, %rsp       @ Allocate stack space

    mov %edi, -4(%rbp)  @ Store first argument
    mov %esi, -8(%rbp)  @ Store second argument

    mov -4(%rbp), %eax
    imul -8(%rbp), %eax
    mov %eax, -12(%rbp) @ Store product

    mov -12(%rbp), %eax @ Return result
    leave
    ret
EOF

# Assemble and analyze
as -g analysis_example.s -o analysis_example.o

# Generate listing with all information
as -alhdn analysis_example.s -o analysis_example.o > analysis.lst

# Generate object dump
objdump -d analysis_example.o > analysis_disasm.txt
```

## Best Practices

### Code Organization
```bash
# Create well-structured assembly
cat > structured.s << 'EOF'
/*
 * File: structured.s
 * Description: Well-structured assembly example
 * Author: Developer
 * Date: 2024
 */

/* Includes */
#include "defines.s"     @ Common definitions
#include "macros.s"      @ Useful macros

/* Constants */
.equ BUFFER_SIZE, 1024
.equ MAX_ITERATIONS, 100

/* Data segment */
.data
buffer: .space BUFFER_SIZE
message: .ascii "Structured assembly example\n"
msg_len = . - message

/* BSS segment (zero-initialized) */
.bss
count: .long 0
result: .quad 0

/* Code segment */
.text
.global main

main:
    /* Function prologue */
    push %rbp
    mov %rsp, %rbp

    /* Initialize variables */
    mov $0, count(%rip)
    mov $0, result(%rip)

    /* Main loop */
    mov $0, %ecx
loop_start:
    cmp $MAX_ITERATIONS, %ecx
    jge loop_end

    /* Loop body */
    inc count(%rip)
    inc %ecx
    jmp loop_start

loop_end:
    /* Function epilogue */
    mov $0, %eax        @ Return 0
    leave
    ret
EOF

# Assemble with all warnings
as --fatal-warnings -g structured.s -o structured.o
```

### Performance Optimization
```bash
# Create optimized.s
cat > optimized.s << 'EOF'
.text
.global optimized_memcpy

.optimized_memcpy:
    /* Optimized memory copy using SIMD */
    push %rbp
    mov %rsp, %rbp

    /* Save registers */
    push %rdi
    push %rsi
    push %rdx

    /* Align destination to 16-byte boundary */
    mov %rdi, %rax
    and $15, %rax
    jz .aligned

    /* Copy unaligned bytes */
    mov %rdi, %rcx
.copy_unaligned:
    test $15, %rcx
    jz .aligned
    movb (%rsi), %al
    movb %al, (%rdi)
    inc %rsi
    inc %rdi
    inc %rcx
    dec %edx
    jnz .copy_unaligned

.aligned:
    /* Check if we have at least 64 bytes */
    cmp $64, %edx
    jl .copy_small

    /* Copy 64 bytes at a time using AVX */
.copy_large:
    cmp $64, %edx
    jl .copy_remaining
    vmovdqa (%rsi), %ymm0
    vmovdqa %ymm0, (%rdi)
    vmovdqa 32(%rsi), %ymm1
    vmovdqa %ymm1, 32(%rdi)
    add $64, %rsi
    add $64, %rdi
    sub $64, %edx
    jmp .copy_large

.copy_small:
    cmp $32, %edx
    jl .copy_remaining
    vmovdqa (%rsi), %ymm0
    vmovdqa %ymm0, (%rdi)
    add $32, %rsi
    add $32, %rdi
    sub $32, %edx
    jmp .copy_small

.copy_remaining:
    /* Copy remaining bytes */
    test %edx, %edx
    jz .done
    movb (%rsi), %al
    movb %al, (%rdi)
    inc %rsi
    inc %rdi
    dec %edx
    jmp .copy_remaining

.done:
    /* Restore registers */
    pop %rdx
    pop %rsi
    pop %rdi
    leave
    ret
EOF

# Assemble with AVX support
as -march=x86-64 -mavx2 optimized.s -o optimized.o
```

## Troubleshooting

### Common Assembly Errors

#### Symbol Resolution
```bash
# Create error_example.s with symbol issues
cat > error_example.s << 'EOF'
.text
.global _start
.global undefined_function

_start:
    call undefined_function  @ Undefined symbol
    mov undefined_data, %rax @ Undefined data

    mov $60, %rax
    syscall
EOF

# Assemble with warnings to detect issues
as --warn -o error_example.o error_example.s

# Use nm to check symbols
nm error_example.o
```

#### Memory Alignment Issues
```bash
# Create alignment_example.s
cat > alignment_example.s << 'EOF'
.text
.global _start

_start:
    /* Unaligned memory access */
    mov $0x1001, %rax      @ Unaligned address
    mov (%rax), %rbx       @ May cause performance issues

    /* Aligned memory access */
    .align 16
aligned_data:
    .quad 0x1234567890abcdef

    mov $aligned_data, %rax @ Aligned address
    mov (%rax), %rbx       @ Efficient access

    mov $60, %rax
    syscall
EOF

# Assemble with alignment checking
as -g --fatal-warnings alignment_example.s -o alignment_example.o

# Check alignment with objdump
objdump -h alignment_example.o
```

#### Stack Frame Issues
```bash
# Create stack_frame_example.s
cat > stack_frame_example.s << 'EOF'
.text
.global _start

_start:
    /* Correct stack frame setup */
    push %rbp
    mov %rsp, %rbp
    sub $16, %rsp         @ Allocate stack space

    /* Use stack-allocated data */
    mov $42, -4(%rbp)     @ Store local variable
    mov -4(%rbp), %eax    @ Load local variable

    /* Clean stack frame */
    leave
    mov $60, %rax
    syscall
EOF

# Assemble with debugging info to verify stack usage
as -gdwarf-5 -fverbose-asm stack_frame_example.s -o stack_frame_example.o
```

## Integration with Other Tools

### Linker Scripts
```bash
# Create custom linker script
cat > custom.ld << 'EOF'
ENTRY(_start)

SECTIONS
{
    . = 0x400000;  /* Load address */

    .text : {
        *(.text)
        *(.rodata)
    }

    .data : {
        *(.data)
    }

    .bss : {
        *(.bss)
    }

    . = ALIGN(4096);  /* Page align */
    .stack : {
        . = . + 8192;  /* 8KB stack */
        . = ALIGN(16);
    }
}
EOF

# Link with custom script
ld -T custom.ld program.o -o program
```

### Binary Utilities Integration
```bash
# Create comprehensive analysis pipeline
as -g -alhdn program.s -o program.o > program.lst
objdump -d program.o > program.disasm
objdump -t program.o > program.symbols
readelf -h program.o > program.header
readelf -S program.o > program.sections
size program.o > program.size
```

## Related Commands

- [`gcc`](/docs/commands/development/gcc) - GNU C Compiler (can assemble .s files)
- [`ld`](/docs/commands/other/ld) - GNU Linker
- [`objdump`](/docs/commands/development/objdump) - Object file analysis tool
- [`nm`](/docs/commands/development/nm) - Symbol table extraction tool
- [`readelf`](/docs/commands/development/readelf) - ELF file analysis tool
- [`gdb`](/docs/commands/development/gdb) - GNU Debugger
- [`make`](/docs/commands/development/make) - Build automation tool
- [`ar`](/docs/commands/other/ar) - Archive utility for creating libraries

## Best Practices

1. **Use proper calling conventions** for your target architecture
2. **Generate debug information** (-g) for all development builds
3. **Comment your assembly code** extensively
4. **Use symbolic names** instead of magic numbers
5. **Align data structures** properly for performance
6. **Test with different optimization levels**
7. **Use static analysis tools** to catch issues early
8. **Maintain stack discipline** with proper prologues/epilogues
9. **Consider position independent code** for shared libraries
10. **Validate register usage** according to ABI specifications

## Performance Tips

1. **Align data on natural boundaries** (16-byte for SSE, 32-byte for AVX)
2. **Use SIMD instructions** for data-parallel operations
3. **Minimize memory accesses** by keeping data in registers
4. **Use LEA** for address arithmetic instead of ADD/SHL combinations
5. **Avoid partial register stalls** on x86 architecture
6. **Unroll loops** for hot code paths
7. **Use branch prediction hints** when branch direction is known
8. **Cache-optimize** your data structures
9. **Prefer MOV over PUSH/POP** for register saves when possible
10. **Profile your code** to identify actual bottlenecks

The `as` command is a fundamental tool for low-level programming, providing direct control over hardware resources and enabling maximum performance optimizations. Its integration with the GNU toolchain and support for multiple architectures makes it essential for system programming, embedded development, and performance-critical applications.