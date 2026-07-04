const student = {
  name: "ชื่อ-นามสกุล",
  studentId: "รหัสนักศึกษา",
  os: process.platform,
  node: process.version,
};

function createGreeting({ name, studentId, os, node }) {
  return `Hello ${name} (${studentId}) | OS: ${os} | Node: ${node}`;
}

console.log(createGreeting(student));
